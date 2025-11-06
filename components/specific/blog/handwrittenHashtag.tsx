import Image from "next/image";

export default function HandwrittenHashtag({
  className,
}: {
  className: string;
}) {
  return (
    <Image
      className={className}
      src="/svg/hashtag.svg"
      alt="hashtag"
      width={15}
      height={15}
    />
  );
}
