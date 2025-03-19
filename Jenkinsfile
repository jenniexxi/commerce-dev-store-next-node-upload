pipeline {
    agent any
    
    environment {
        AWS_REGION = "ap-northeast-2"
        APP_ENV = "${env.BRANCH_NAME == 'main' ? 'production' : 'development'}"
    }
    
    stages {
        stage('Set Build Name') {
            steps {
                script {
                    echo "============================================================== 빌드 네이밍 설정 ===================================================================="
                    // [deploy] 태그가 있는 가장 최근 커밋 찾기
                    def deployCommit = sh(
                        script: "git log --pretty=format:'%H %s' origin/development | grep '\\[deploy\\]' | head -1 | awk '{print \$1}'",
                        returnStdout: true
                    ).trim()
                    
                    if (!deployCommit) {
                        echo "배포할 커밋([deploy] 태그)을 찾을 수 없습니다."
                        currentBuild.result = 'ABORTED'
                        error("배포할 커밋을 찾을 수 없습니다.")
                    }
                    
                    env.DEPLOY_COMMIT = deployCommit
                    echo "배포할 커밋 발견: ${env.DEPLOY_COMMIT}"
                    
                    // 배포 커밋 정보 가져오기
                    def gitCommitter = sh(script: "git log -1 --pretty=format:'%an' ${env.DEPLOY_COMMIT}", returnStdout: true).trim()
                    def commitMessage = sh(script: "git log -1 --pretty=format:'%s' ${env.DEPLOY_COMMIT}", returnStdout: true).trim()
                    def gitHash = env.DEPLOY_COMMIT.substring(0, 7)
                    
                    // 빌드 이름 설정
                    currentBuild.displayName = "${gitCommitter}_#${gitHash}"
                    currentBuild.description = "Deploy Commit Message: ${commitMessage.take(200)}${commitMessage.length() > 200 ? '...' : ''}"
                    echo "빌드 이름: ${currentBuild.displayName}"
                    echo "빌드 설명: ${currentBuild.description}"
                    
                    // 배포 커밋으로 체크아웃
                    sh "git checkout ${env.DEPLOY_COMMIT}"
                }
            }
        }
        
        stage('Setup Parameters') {
            steps {
                script {
                    echo "============================================================== 파라미터 설정 ===================================================================="
                    // AWS 계정 ID 정보 요청
                    env.AWS_ACCOUNT_ID = sh(script: "aws sts get-caller-identity --query 'Account' --output text", returnStdout: true).trim()
                    echo "AWS Account ID: ${env.AWS_ACCOUNT_ID}"
                    
                    // 이전 배포 커밋 찾기
                    def lastDeployCommit = sh(
                        script: "git log --pretty=format:'%H %s' origin/development | grep '\\[deploy\\]' | head -2 | tail -1 | awk '{print \$1}'",
                        returnStdout: true
                    ).trim()
                    
                    // 첫 번째 배포 여부 확인
                    env.IS_FIRST_DEPLOY = "false"
                    if (!lastDeployCommit || lastDeployCommit == env.DEPLOY_COMMIT) {
                        echo "이전 배포 커밋이 없거나 현재 커밋과 동일합니다. 최초 배포로 간주."
                        lastDeployCommit = sh(script: "git rev-list --max-parents=0 HEAD", returnStdout: true).trim()
                        env.IS_FIRST_DEPLOY = "true"
                    }
                    
                    env.LAST_DEPLOY_COMMIT = lastDeployCommit
                    echo "이전 배포 커밋: ${env.LAST_DEPLOY_COMMIT}"
                    
                    // 현재 브랜치 이름 가져오기
                    try {
                        if (env.BRANCH_NAME) {
                            echo "Jenkins 환경 변수에서 브랜치 이름 가져옴: ${env.BRANCH_NAME}"
                        } else {
                            def branchNameCmd = sh(script: "git rev-parse --abbrev-ref HEAD || git name-rev --name-only HEAD || echo unknown", returnStdout: true).trim()
                            
                            if (branchNameCmd == 'HEAD' || branchNameCmd == 'unknown') {
                                def gitLog = sh(script: "git log -n 1 --pretty=%D HEAD", returnStdout: true).trim()
                                def matcher = gitLog =~ /origin\/([^,\s]+)/
                                if (matcher.find()) {
                                    env.BRANCH_NAME = matcher.group(1)
                                } else {
                                    env.BRANCH_NAME = "unknown"
                                }
                            } else {
                                env.BRANCH_NAME = branchNameCmd
                            }
                            echo "Git 명령어로 브랜치 이름 가져옴: ${env.BRANCH_NAME}"
                        }
                    } catch (Exception e) {
                        echo "브랜치 이름 가져오기 실패: ${e.message}"
                        env.BRANCH_NAME = "unknown"
                    }
                    
                    env.IS_DEVELOPMENT = env.BRANCH_NAME != 'main'
                    env.NODE_ENV = env.APP_ENV
                    echo "빌드 및 배포 활성화 상태: ${env.IS_DEVELOPMENT}"
                    echo "현재 환경: ${env.NODE_ENV}"
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "============================================================== 체크아웃 =================================================================="
                }
            }
        }
        
        stage('Discover Services') {
            steps {
                script {
                    echo "============================================================== 서비스 조회 및 변경 분석 =================================================================="
                    def allServices = sh(script: "ls -l apps/ | grep '^d' | awk '{print \$9}'", returnStdout: true).trim().split("\n")
                    env.ALL_SERVICES = allServices.join(',')
                    echo ">>>>>>>>>> 발견된 서비스: ${env.ALL_SERVICES}"
                    
                    // 이전 배포 커밋과 현재 배포 커밋 사이의 변경사항 분석
                    def changedFiles = sh(
                        script: "git diff --name-only ${env.LAST_DEPLOY_COMMIT} ${env.DEPLOY_COMMIT}",
                        returnStdout: true
                    ).trim()
                    
                    echo ">>>>>>>>>> 변경된 파일 목록: ${changedFiles}"
                    
                    // 공통 모듈 변경 여부 확인
                    def commonModuleChanged = changedFiles.contains('packages/') || 
                                           changedFiles.contains('package.json') ||
                                           changedFiles.contains('turbo.json') ||
                                           changedFiles.contains('pnpm-lock.yaml')
                    
                    env.COMMON_MODULE_CHANGED = commonModuleChanged.toString()
                    echo ">>>>>>>>>> 공통 모듈 변경 여부: ${env.COMMON_MODULE_CHANGED}"
                    
                    // 변경된 서비스 목록 생성
                    def changedServices = []
                    allServices.each { service ->
                        if (changedFiles.contains("apps/${service}/")) {
                            changedServices.add(service)
                            echo ">>>>>>>>>> ${service} 서비스 변경 감지"
                        }
                    }
                    
                    // 첫 번째 배포이거나 공통 모듈이 변경되었다면 모든 서비스 빌드 대상에 포함
                    if ((env.IS_FIRST_DEPLOY == "true") || (commonModuleChanged && changedServices.size() == 0)) {
                        changedServices = allServices
                        echo ">>>>>>>>>> 첫 번째 배포이거나 공통 모듈 변경으로 인해 모든 서비스가 빌드 대상에 포함됩니다."
                    }
                    
                    env.BUILD_SERVICES = changedServices.join(',')
                    echo ">>>>>>>>>> 빌드 대상 서비스: ${env.BUILD_SERVICES}"
                    
                    if (changedServices.size() == 0) {
                        echo "---------------------------------------------------- 빌드할 서비스가 없습니다. 파이프라인을 종료합니다. -----------------------------------------------------"
                        currentBuild.result = 'SUCCESS'
                        error("빌드할 서비스가 없습니다.")
                    }
                }
            }
        }
        stage('Install Dependencies') {
            when {
                expression { return env.BUILD_SERVICES != '' && env.IS_DEVELOPMENT == 'true' }
            }
            steps {
                script {
                    echo "============================================================= 의존성 설치 =================================================================="
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        . "$NVM_DIR/nvm.sh"
                        
                        nvm install 20.10.0
                        nvm use 20.10.0
                        
                        node -v
                        npm -v
                        
                        npm install -g pnpm@9.0.0 --prefix $HOME/.local
                        export PATH="$HOME/.local/bin:$PATH"
                        
                        pnpm install --frozen-lockfile
                    '''
                }
            }
        }
        stage('AWS ECR 로그인') {
            when {
                expression { return env.BUILD_SERVICES != '' && env.IS_DEVELOPMENT == 'true' }
            }
            steps {
                script {
                    echo "============================================================== AWS ECR 로그인 =================================================================="
                }
                withAWS(region: AWS_REGION) {
                    sh """
                        echo "[INFO] ECR 로그인"   
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }
        stage('Build and Deploy Services') {
            when {
                expression { return env.BUILD_SERVICES != '' && env.IS_DEVELOPMENT == 'true' }
            }
            steps {
                script {
                    echo "============================================================== 도커 이미지 빌드 및 푸시 =================================================================="
                    sh "mkdir -p jenkins/ecs-task-def"
                    
                    def buildServicesList = env.BUILD_SERVICES.split(',')
                    
                    buildServicesList.each { service ->
                        echo "서비스 '${service}' 빌드 및 배포 시작"
                        
                        // 서비스 설정 파일 로드
                        def serviceConfigJson = readFile("apps/${service}/service.config.json")
                        def serviceConfig = readJSON text: serviceConfigJson
                        
                        def imageTag = "${BUILD_NUMBER}-${env.DEPLOY_COMMIT.substring(0, 7)}"
                        def ecrName = serviceConfig.ecrName
                        def ecrImage = "${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ecrName}:${imageTag}"
                        def servicePort = serviceConfig.port
                        def ecsServiceName = serviceConfig.ecsServiceName
                        def ecsClusterName = serviceConfig.ecsClusterName ?: "rr-dev-cluster"
                        def taskFamily = serviceConfig.taskFamily
                        def containerName = serviceConfig.containerName
                        def taskDefFile = "jenkins/ecs-task-def/${service}.json"
                        
                        // 도커 이미지 빌드 및 푸시
                        sh """
                            echo ">>>>>>>>>>>>>>> [INFO] ${service} 서비스 도커 이미지 빌드 시작"
                            
                            # 1. 환경 변수 파일 복사
                            echo ">>>>>>>>>>>>>>> [STEP 1] 환경 변수 파일 설정"
                            if [ "${env.APP_ENV}" = "production" ]; then
                                cp apps/${service}/.env.production apps/${service}/.env
                            else
                                cp apps/${service}/.env.development apps/${service}/.env
                            fi
                            echo ">> 현재 환경: ${env.NODE_ENV}"
                            
                            # 2. 도커 캐시 정리
                            echo ">>>>>>>>>>>>>>> [STEP 2] 도커 캐시 정리"
                            docker system prune -af --volumes
                            
                            # 3. 도커 빌드
                            echo ">>>>>>>>>>>>>>> [STEP 3] 도커 빌드 시작 (캐시 없음)"
                            set -x  # 명령어 출력 활성화 (디버깅용)
                            DOCKER_BUILDKIT=1 docker build --progress=plain --no-cache \
                                -t ${ecrName}:${imageTag} \
                                --build-arg SKIP_TYPE_CHECK=true \
                                --build-arg NODE_ENV=${env.NODE_ENV} \
                                -f apps/${service}/Dockerfile .
                            set +x  # 명령어 출력 비활성화
                            
                            # 4. 이미지 태깅
                            echo ">>>>>>>>>>>>>>> [STEP 4] 이미지 태그 설정"
                            docker tag ${ecrName}:${imageTag} ${ecrImage}
                            
                            # 5. 이미지 정보 확인
                            echo ">>>>>>>>>>>>>>> [STEP 5] 이미지 정보 확인"
                            docker images ${ecrName}:${imageTag} --format "서비스: ${service}, 크기: {{.Size}}"
                            
                            # 6. ECR 이미지 푸시
                            echo ">>>>>>>>>>>>>>> [STEP 6] ECR에 이미지 푸시"
                            docker push ${ecrImage}
                            
                            echo ">>>>>>>>>>>>>>> [INFO] 이미지 빌드 및 푸시 완료"
                        """
                        
                        // ECS 태스크 정의 파일 생성
                        sh """
                            echo ">>>>>>>>>>>>>>> [STEP 7] 태스크 정의 파일 생성"
                            cat <<EOF > ${taskDefFile}
{
    "family": "${taskFamily}",
    "containerDefinitions": [
        {
            "name": "${containerName}",
            "image": "${ecrImage}",
            "cpu": ${serviceConfig.cpu},
            "memory": ${serviceConfig.memory},
            "memoryReservation": ${serviceConfig.memoryReservation},
            "portMappings": [
                {
                    "name": "${service}-port",
                    "containerPort": ${servicePort},
                    "hostPort": ${servicePort},
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "NODE_ENV",
                    "value": "${env.NODE_ENV}"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "${serviceConfig.logGroup}",
                    "mode": "non-blocking",
                    "awslogs-create-group": "true",
                    "max-buffer-size": "25m",
                    "awslogs-region": "${AWS_REGION}",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ],
    "taskRoleArn": "arn:aws:iam::${env.AWS_ACCOUNT_ID}:role/rr-dev-ecs-task-iam-role",
    "executionRoleArn": "arn:aws:iam::${env.AWS_ACCOUNT_ID}:role/rr-dev-ecs-task-execution-iam-role",
    "networkMode": "awsvpc",
    "requiresCompatibilities": ["FARGATE"],
    "cpu": "${serviceConfig.cpu}",
    "memory": "${serviceConfig.memory}",
    "runtimePlatform": {
        "cpuArchitecture": "X86_64",
        "operatingSystemFamily": "LINUX"
    }
}
EOF
                        """
                        
                        // ECS 서비스 업데이트
                        withAWS(region: AWS_REGION) {
                            sh """
                                echo "============================================================== ECS 서비스 업데이트 =================================================================="
                                # 현재 ECS 서비스 네트워크 구성 정보 가져오기
                                SERVICE_INFO=\$(aws ecs describe-services --cluster ${ecsClusterName} --services ${ecsServiceName} --region ${AWS_REGION})
                                
                                # 서브넷 추출
                                SUBNETS=\$(echo \$SERVICE_INFO | jq -r '.services[0].networkConfiguration.awsvpcConfiguration.subnets | join(",")')
                                
                                # 보안 그룹 추출
                                SECURITY_GROUPS=\$(echo \$SERVICE_INFO | jq -r '.services[0].networkConfiguration.awsvpcConfiguration.securityGroups | join(",")')
                                
                                # 퍼블릭 IP 할당 여부 추출
                                ASSIGN_PUBLIC_IP=\$(echo \$SERVICE_INFO | jq -r '.services[0].networkConfiguration.awsvpcConfiguration.assignPublicIp')
                                
                                echo ">>>>>>>>>>>>>>> [INFO] 태스크 정의 등록"
                                REGISTERED=\$(aws ecs register-task-definition --cli-input-json file://${taskDefFile} --region ${AWS_REGION})
                                NEW_TASK_DEF_ARN=\$(echo "\$REGISTERED" | jq -r '.taskDefinition.taskDefinitionArn')
                                
                                echo ">>>>>>>>>>>>>>> [INFO] 서비스 업데이트: ${ecsServiceName}"
                                echo ">>>>>>>>>>>>>>> [INFO] 서브넷: \$SUBNETS"
                                echo ">>>>>>>>>>>>>>> [INFO] 보안 그룹: \$SECURITY_GROUPS"
                                echo ">>>>>>>>>>>>>>> [INFO] 퍼블릭 IP 할당: \$ASSIGN_PUBLIC_IP"
                                
                                aws ecs update-service \\
                                    --region ${AWS_REGION} \\
                                    --cluster ${ecsClusterName} \\
                                    --service ${ecsServiceName} \\
                                    --task-definition "\$NEW_TASK_DEF_ARN" \\
                                    --network-configuration "awsvpcConfiguration={subnets=[\$SUBNETS],securityGroups=[\$SECURITY_GROUPS],assignPublicIp=\$ASSIGN_PUBLIC_IP}" \\
                                    --force-new-deployment
                            """
                        }
                        
                        // 이미지 정리
                        sh """
                            echo ">>>>>>>>>>>>>>> [INFO] 로컬 이미지 정리"
                            docker rmi ${ecrImage} || true
                            docker rmi ${ecrName}:${imageTag} || true
                        """
                        
                        echo ">>>>>>>>>>>>>>> [INFO] 서비스 '${service}' 배포 완료"
                    }
                }
            }
        }
        
        stage('Mark Deployment') {
            steps {
                script {
                    echo "============================================================== 배포 완료 마킹 =================================================================="
                    echo "배포 커밋 ${env.DEPLOY_COMMIT}에 대한 배포가 완료되었습니다."
                    
                    // 원래 브랜치로 복귀
                    sh "git checkout origin/development"
                }
            }
        }
    }
    
    post {
        always {
            script { 
                echo "============================================================== 워크스페이스 정리 =================================================================="
                
                if (currentBuild.result == 'FAILURE') {
                    echo ">>>>>>>>>>>>>>> [INFO] 파이프라인 완료: 실패"
                } else {
                    echo ">>>>>>>>>>>>>>> [INFO] 파이프라인 완료: 성공"
                }
            }
        }
        failure {
            script {
                try {
                    def gitCommitter = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
                    def gitHash = sh(script: 'git log -1 --pretty=format:"%h"', returnStdout: true).trim()
                    def commitMessage = sh(script: 'git log -1 --pretty=format:"%s"', returnStdout: true).trim()
                    currentBuild.displayName = "🔴 FAILED-${gitCommitter}-${gitHash}"
                    currentBuild.description = "Last committer: ${gitCommitter} \nLast Commit: ${gitHash} \nMessage: ${commitMessage.take(80)}${commitMessage.length() > 80 ? '...' : ''} \nConsole Output을 참고하여 문제를 해결하세요."
                } catch (Exception e) {
                    echo ">>>>>>>>>>>>>>> [INFO] Git 정보 가져오기 실패: ${e.message}"
                    currentBuild.displayName = "🔴 FAILED-UNKNOWN"
                    currentBuild.description = "빌드 실패. Console Output을 참고하세요."
                }
            }
        }
        cleanup {
            script {
                try {
                    echo ">>>>>>>>>>>>>>> [INFO] 워크스페이스 정리 시작"
                    cleanWs()
                    echo ">>>>>>>>>>>>>>> [INFO] 워크스페이스 정리 완료"
                } catch (Exception e) {
                    echo ">>>>>>>>>>>>>>> [INFO] 워크스페이스 정리 중 오류 발생: ${e.message}"
                }
            }
        }
    }
} 

