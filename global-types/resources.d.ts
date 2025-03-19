declare module '@resources' {
  interface ResourceMap {
    img: Record<string, string>;
    svg: Record<string, string>;
    lotties: Record<string, any>;
  }

  const R: ResourceMap;
  export default R;
}
