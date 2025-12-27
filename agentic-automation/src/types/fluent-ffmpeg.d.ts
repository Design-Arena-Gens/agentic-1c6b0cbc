declare module "fluent-ffmpeg" {
  import { Readable } from "stream";

  interface FfmpegCommand {
    input(source: string | Readable): FfmpegCommand;
    inputOption(option: string): FfmpegCommand;
    complexFilter(filters: any, map?: string): FfmpegCommand;
    outputOptions(options: string[]): FfmpegCommand;
    save(path: string): FfmpegCommand;
    on(event: "end", callback: () => void): FfmpegCommand;
    on(event: "error", callback: (error: Error, stdout?: string, stderr?: string) => void): FfmpegCommand;
  }

  function ffmpeg(source?: string | Readable): FfmpegCommand;
  namespace ffmpeg {
    function setFfmpegPath(path: string): void;
  }

  export = ffmpeg;
}
