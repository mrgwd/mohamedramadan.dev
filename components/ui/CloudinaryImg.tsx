import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface CloudinaryImgProps extends React.ComponentPropsWithoutRef<"img"> {
  width?: number;
  height?: number;
  placeholder?: "blur" | "empty";
  src: string;
  alt: string;
  caption?: string;
}
export default function CloudinaryImg({
  width = 400,
  height = 800,
  placeholder = "blur",
  src,
  alt = "",
  caption = alt,
  ...props
}: CloudinaryImgProps) {
  return (
    <figure>
      <Zoom>
        <Image
          src={src}
          blurDataURL={src}
          width={width}
          height={height}
          alt={alt}
          className="mb-1 w-full rounded object-cover"
          placeholder={placeholder}
          loading={props.loading || "lazy"}
          {...props}
        />
      </Zoom>
      <figcaption className="text-sm italic">{caption}</figcaption>
    </figure>
  );
}
