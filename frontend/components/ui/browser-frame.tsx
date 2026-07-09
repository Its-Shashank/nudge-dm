import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

export interface BrowserFrameProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function BrowserFrame({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
}: BrowserFrameProps) {
  return (
    <div className={cn("w-full relative group", className)}>
      <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all opacity-50" />
      <div className="relative bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xl overflow-hidden">
        <div className="h-8 bg-surface-container-low border-b border-outline-variant flex items-center px-4 gap-1">
          <div className="w-3 h-3 rounded-full bg-error/40" />
          <div className="w-3 h-3 rounded-full bg-tertiary/40" />
          <div className="w-3 h-3 rounded-full bg-secondary/40" />
        </div>
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          quality={90}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
          className={cn("w-full object-cover aspect-video", imageClassName)}
        />
      </div>
    </div>
  );
}

export interface ImageCardProps extends Omit<ImageProps, "className"> {
  wrapperClassName?: string;
  imageClassName?: string;
}

export function ImageCard({
  wrapperClassName,
  imageClassName,
  alt,
  ...props
}: ImageCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-outline-variant shadow-xl overflow-hidden bg-white p-2",
        wrapperClassName,
      )}
    >
      <Image
        alt={alt}
        className={cn("rounded-xl w-full h-full object-cover", imageClassName)}
        {...props}
      />
    </div>
  );
}
