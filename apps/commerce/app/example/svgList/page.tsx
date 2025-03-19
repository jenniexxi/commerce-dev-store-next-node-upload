'use client';
import React, { useEffect, useRef, useState } from 'react';

import LottieReact from 'lottie-react';
import * as S from './svgList.style';
import SvgIcon from '@ui/commons/SvgIcon';
import { Checkbox } from '@ui/components';

// SVG 아이콘 아이템
type SvgItem = {
  name: string;
  path: string;
  copyImport: boolean;
};

// Lottie 아이템
type LottieItem = {
  name: string;
  data: any;
};

// API 응답 타입
type ApiResponse = {
  svg: string[];
  lottie: string[];
};

// Lottie 아이템 컴포넌트
const LottieItem = React.memo(
  ({
    name,
    data,
    isPlaying,
    onPlayingChange,
  }: LottieItem & { isPlaying: boolean; onPlayingChange: (playing: boolean) => void }) => {
    const lottieRef = React.useRef<any>(null);

    useEffect(() => {
      if (lottieRef.current) {
        if (isPlaying) {
          lottieRef.current.play();
        } else {
          lottieRef.current.stop();
        }
      }
    }, [isPlaying]);

    const handleClick = () => {
      onPlayingChange(!isPlaying);
    };

    return (
      <S.Item onClick={handleClick}>
        <S.LottieContainer>
          <div style={{ width: '48px', height: '48px' }}>
            <LottieReact
              lottieRef={lottieRef}
              animationData={data}
              loop={true}
              autoplay={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <S.StatusIndicator $isPlaying={isPlaying}>{isPlaying ? '재생중' : '클릭하여 재생'}</S.StatusIndicator>
        </S.LottieContainer>
        <S.Name>{name}</S.Name>
        <S.CopyText>클릭하여 재생/정지</S.CopyText>
      </S.Item>
    );
  },
);

// SVG 아이템 컴포넌트
const SvgItem = React.memo(({ name, path, copyImport }: SvgItem) => {
  const copyToClipboard = () => {
    if (copyImport) {
      // CamelCase로 변환하는 함수 (svg 파일명을 컴포넌트 이름으로 변환)

      const toCamelCase = (str: string) => {
        // 파일 경로에서 파일명만 추출 (확장자 제외)
        const fileName = path.split('/').pop()?.replace('.svg', '') || '';

        // 단어별로 분리하고 camelCase로 변환
        return fileName
          .split(/[-_\s]+/)
          .map((word, index) => {
            if (index === 0) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join('');
      };

      const componentName = toCamelCase(name);

      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      const importStatement = `import ${componentName} from '@${cleanPath}';`;
      void window.navigator.clipboard.writeText(importStatement);
    } else {
      void window.navigator.clipboard.writeText("'/" + path + "'");
    }
  };

  return (
    <S.Item onClick={copyToClipboard}>
      <S.ImageWrapper>
        <SvgIcon
          path={'/' + path}
          width={24}
          height={24}
        />
      </S.ImageWrapper>
      <S.Name>{name}</S.Name>
      <S.CopyText>클릭하여 Import 복사</S.CopyText>
    </S.Item>
  );
});

export default function AssetPalettePage() {
  const [svgList, setSvgList] = useState<SvgItem[]>([]);
  const [lottieList, setLottieList] = useState<LottieItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});
  const [copyImport, setCopyImport] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      setIsLoading(true);
      try {
        // API를 통해 SVG와 Lottie 파일 목록 가져오기
        const response = await fetch('/example/svgList/svg-files');
        const data: ApiResponse = await response.json();

        // SVG 컴포넌트 로드
        const svgItems = await Promise.all(
          data.svg.map(async (fileName) => {
            // 파일 확장자 제거
            const name = fileName.replace('.svg', '');

            try {
              // 동적 import 사용하여 SVG 컴포넌트 로드

              return {
                name,
                path: `ui/svg/${fileName}`,
                copyImport,
              };
            } catch (err) {
              console.error(`SVG 로드 실패: ${name}`, err);
              return {
                name,
                path: '',
                copyImport,
              };
            }
          }),
        );

        // Lottie 파일 로드
        const lottieItems = await Promise.all(
          data.lottie?.map(async (fileName) => {
            // 파일 확장자 제거
            const name = fileName.replace('.json', '');

            try {
              // 동적 import 사용하여 Lottie 데이터 로드
              const module = await import(`@ui/lottie/${fileName}`);

              return {
                name,
                data: module.default,
              };
            } catch (err) {
              console.error(`Lottie 로드 실패: ${name}`, err);
              return {
                name,
                data: null,
              };
            }
          }),
        );

        setSvgList(svgItems);
        setLottieList(lottieItems.filter((item) => item.data !== null));
      } catch (error) {
        console.error('에셋을 불러오는 중 오류 발생:', error);
        setSvgList([]);
        setLottieList([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadAssets();
  }, []);

  // Lottie 재생 상태 관리
  const handlePlayingChange = (id: string, playing: boolean) => {
    setPlayingStates((prev) => ({
      ...prev,
      [id]: playing,
    }));
  };

  // 검색어에 따라 필터링된 리스트
  const filteredSvgList = svgList.filter((svg) => svg.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredLottieList = lottieList.filter((lottie) =>
    lottie.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Asset Palette</S.Title>
        <S.Description>SVG 아이콘 및 Lottie 애니메이션 목록을 확인하고 코드를 쉽게 복사할 수 있습니다</S.Description>
      </S.Header>

      <S.SearchContainer>
        <S.SearchInput
          type='text'
          placeholder='아이콘 이름 검색...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </S.SearchContainer>

      {isLoading ? (
        <S.LoadingMessage>에셋을 불러오는 중...</S.LoadingMessage>
      ) : (
        <>
          {/* SVG 섹션 */}
          <S.Section>
            <S.SectionTitle>SVG Icons</S.SectionTitle>
            <S.StatsInfo>
              총 {svgList.length}개 아이콘 ({filteredSvgList.length}개 표시 중)
            </S.StatsInfo>
            <S.StatsInfo>
              <Checkbox
                id='import'
                name='import'
                value='import 복사'
                checked={copyImport}
                onChange={setCopyImport}
              />
            </S.StatsInfo>
            {filteredSvgList.length > 0 ? (
              <S.Grid>
                {filteredSvgList.map((svg) => (
                  <div key={`svg-${svg.name}`}>
                    <SvgItem
                      copyImport={copyImport}
                      name={svg.name}
                      path={svg.path}
                    />
                  </div>
                ))}
              </S.Grid>
            ) : (
              <S.NoResults>검색 결과가 없습니다.</S.NoResults>
            )}
          </S.Section>

          {/* Lottie 섹션 */}
          {lottieList.length > 0 && (
            <S.Section>
              <S.SectionTitle>Lottie Animations</S.SectionTitle>
              <S.StatsInfo>
                총 {lottieList.length}개 애니메이션 ({filteredLottieList.length}개 표시 중)
              </S.StatsInfo>

              {filteredLottieList.length > 0 ? (
                <S.Grid>
                  {filteredLottieList.map((lottie) => (
                    <div key={`lottie-${lottie.name}`}>
                      <LottieItem
                        name={lottie.name}
                        data={lottie.data}
                        isPlaying={playingStates[lottie.name] || false}
                        onPlayingChange={(playing) => handlePlayingChange(lottie.name, playing)}
                      />
                    </div>
                  ))}
                </S.Grid>
              ) : (
                <S.NoResults>검색 결과가 없습니다.</S.NoResults>
              )}
            </S.Section>
          )}
        </>
      )}
    </S.Container>
  );
}
