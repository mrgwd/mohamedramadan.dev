import Image from "next/image";
interface BlogImageProps extends React.ComponentPropsWithoutRef<"img"> {
  width: number;
  height: number;
  src: string;
}
export default function BlogImage({
  width,
  height,
  src,
  ...props
}: BlogImageProps) {
  return (
    <figure className="my-4">
      <Image
        src={src}
        width={width || 800}
        height={height || 400}
        alt={props.alt || ""}
        className="mb-1 w-full cursor-zoom-in rounded object-cover"
        {...props}
        loading="lazy"
      />
      <figcaption className="text-sm italic">{props.alt}</figcaption>
    </figure>
  );
}
