import { cn } from "@/lib/utils";
import Image from "next/image";

interface BucketListItemProps {
  isCompleted: boolean;
  children: React.ReactNode;
}
function BucketListItem({ isCompleted, children }: BucketListItemProps) {
  return (
    <div className="flex gap-2">
      <div
        className={cn(
          "relative mt-1 size-4 shrink-0 rounded-md",
          isCompleted ? "bg-primary/60" : "bg-muted-foreground-subtle/30",
        )}
      >
        {isCompleted && (
          <Image
            src="/svg/checkmark.svg"
            alt="checkmark"
            className="absolute bottom-0.5 left-2/3 -translate-x-1/2 invert dark:invert-0"
            width={18}
            height={18}
            loading="lazy"
          />
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

function BucketListItemTitle({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <h2 className="text-muted-foreground">{children} </h2>;
}

function BucketListItemDescription({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <p className="text-muted-foreground-subtle text-sm">{children}</p>;
}

BucketListItem.Title = BucketListItemTitle;
BucketListItem.Description = BucketListItemDescription;
export default BucketListItem;
