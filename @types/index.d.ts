export declare global {
  type DeepPartial<T> = {
    [K in keyof T]?: DeepPartial<T[K]>
  }
}
