import { cn } from "@/lib/utils";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface BlogImageProps extends React.ComponentPropsWithoutRef<"img"> {
  width?: number;
  height?: number;
  className?: string;
  src: string;
  alt: string;
  placeholder?: "blur" | "empty";
}
export default function BlogImage({
  width = 800,
  height = 400,
  className = "",
  src,
  alt,
  placeholder = "blur",
  ...props
}: BlogImageProps) {
  return (
    <figure>
      <Zoom>
        <Image
          src={src}
          blurDataURL={src}
          width={width}
          height={height}
          alt={alt}
          className={cn("mb-1 w-full rounded object-cover", className)}
          loading={props.loading || "lazy"}
          placeholder={placeholder}
          {...props}
        />
      </Zoom>
      {alt && <figcaption className="text-sm italic">{alt}</figcaption>}
    </figure>
  );
}
