import {
  Calendar03Icon,
  Comment01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../../../components/ui/Button";

export type PostProp = {
  author: string;
  date: string;
  comments: string;
  image: string;
  title: string;
  text: string;
};

const posts: PostProp[] = [
  {
    author: "Kristin",
    date: "19Dec, 2013",
    comments: "453",
    image: "/placeholder.svg",
    title:
      "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    text: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    author: "Robert",
    date: "28 Nov, 2015",
    comments: "738",
    image: "/placeholder.svg",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    text: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    author: "Arlene",
    date: "9 May, 2014",
    comments: "826",
    image: "/placeholder.svg",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    text: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

function NewsCard({ post }: { post: PostProp }) {
  return (
    <article className="w-full max-w-87.5 rounded-[3px] border border-border px-5 pb-5 pt-5 shadow-[0_18px_34px_rgba(22,34,51,0.08)]">
      <img
        src={post.image}
        alt="Latest news"
        loading="lazy"
        className="max-h-51 w-full rounded-[3px] object-cover"
      />

      <div className="mt-5  flex items-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center justify-center gap-2 text-xs">
            <HugeiconsIcon
              className="text-secondary size-5"
              icon={UserCircleIcon}
            />
            {post.author}
          </span>
          <span className="flex items-center justify-center gap-2 text-xs">
            <HugeiconsIcon
              className="text-secondary size-5"
              icon={Calendar03Icon}
            />
            {post.date}
          </span>
          <span className="flex items-center justify-center gap-2 text-xs">
            <HugeiconsIcon
              className="text-secondary size-5"
              icon={Comment01Icon}
            />
            {post.comments}
          </span>
        </div>
      </div>

      <h3 className="mt-3 text-base font-semibold ">{post.title}</h3>

      <p className="mt-3 text-xs font-medium text-foreground/50 line-clamp-3">
        {post.text}
      </p>

      <Button
        variant="outline"
        className="border-2 border-secondary/30 rounded-sm mt-4"
      >
        Read More
      </Button>
    </article>
  );
}

export default function BLogs() {
  return (
    <section className="mt-12 bg-muted py-16">
      <h2 className="text-center text-2xl font-extrabold tracking-[-0.02em]">
        Latest News
      </h2>

      <div className="md:w-[70%] w-[95%] mx-auto mt-10 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.author} post={post} />
        ))}
      </div>
    </section>
  );
}
