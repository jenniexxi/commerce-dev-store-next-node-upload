import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const SearchContainer = styled.div`
  margin-bottom: 32px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #eee;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

export const Section = styled.section`
  margin-bottom: 48px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

export const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Name = styled.span`
  font-size: 12px;
  color: #333;
  text-align: center;
  word-break: break-all;
  margin-bottom: 4px;
`;

export const CopyText = styled.span`
  font-size: 10px;
  color: #999;
  text-align: center;
`;

export const StatsInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 16px;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 16px;
`;

export const LottieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const LottieWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  position: relative;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  svg {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const StatusIndicator = styled.div<{ $isPlaying: boolean }>`
  background: ${({ $isPlaying }) => ($isPlaying ? '#007AFF' : '#E5E5EA')};
  color: ${({ $isPlaying }) => ($isPlaying ? 'white' : '#8E8E93')};
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
`;
