import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    // SVG 파일 경로
    const svgDirPath = path.join(process.cwd(), '../../packages/ui/src/assets/svg');

    // Lottie 파일 경로 (경로는 실제 프로젝트 구조에 맞게 조정해야 합니다)
    const lottieDirPath = path.join(process.cwd(), '../../packages/ui/src/assets/lottie');

    // SVG 파일 목록 가져오기
    let svgFiles: string[] = [];
    try {
      const files = await fs.readdir(svgDirPath);
      svgFiles = files.filter((file) => file.endsWith('.svg'));
    } catch (error) {
      console.error('SVG 파일 목록을 읽는 중 오류 발생:', error);
      svgFiles = [];
    }

    // Lottie 파일 목록 가져오기
    let lottieFiles: string[] = [];
    try {
      const files = await fs.readdir(lottieDirPath);
      lottieFiles = files.filter((file) => file.endsWith('.json'));
    } catch (error) {
      console.error('Lottie 파일 목록을 읽는 중 오류 발생:', error);
      lottieFiles = [];
    }

    // 결합된 결과 반환
    return NextResponse.json({
      svg: svgFiles,
      lottie: lottieFiles,
    });
  } catch (error) {
    console.error('파일 목록을 읽는 중 오류 발생:', error);
    return NextResponse.json({ error: '파일 목록을 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
