import Image from "next/image";
import { Avatar, Button } from "tayeh-react";
import classes from "./NewsItem.module.css";
import moment from "moment";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";

export default function NewsItem(props) {
  const { item } = props;

  let final_like = false;
  let all_likes = JSON.parse(localStorage.getItem("2222"));
  let liked_now = all_likes.find((it) => it.id === item.id);
  if (typeof liked_now !== "undefined") {
    final_like = true;
  } else {
    final_like = false;
  }

  let all_comments = JSON.parse(localStorage.getItem("1111"));
  let this_comments = all_comments.filter((it) => it.newsId === item.id);
  const [comments, setComments] = useState(this_comments);
  const [liked, setLiked] = useState(final_like);
  const [comCounter, setComCounter] = useState(0);

  let changeComCounter = () => {
    setComCounter(comCounter + 1);
  };
  useEffect(() => {
    setComments(this_comments);
  }, [comCounter, item]);

  useEffect(() => {
    setLiked(final_like);
  }, [item, liked]);

  let likeHandler = () => {
    let all_likes = JSON.parse(localStorage.getItem("2222"));
    if (liked) {
      let new_likes = all_likes.filter((it) => it.id !== item.id);
      localStorage.setItem("2222", JSON.stringify(new_likes));
      setLiked(false);
    } else {
      let newer_likes = [...all_likes, item];
      localStorage.setItem("2222", JSON.stringify(newer_likes));
      setLiked(true);
    }
  };
  return (
    <div>
      <div className="ty-flex ty-space-between align-items-center">
        <h2 className="lh-28">{item.title}</h2>
        <Button layout="clear" color="danger" onClick={likeHandler}>
          <i
            className={`ty-icon fs-26 ty-icon-heart${liked ? "" : "-outline"}`}
          />
        </Button>
      </div>
      <div className={`mt-4 ${classes.ratio_}`}>
        <div className={classes.ratio_env}>
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="ty-flex ty-space-between ty-flex-wrap align-items-center my-3 fs-14 ty-color-primary">
        <div className="ty-flex ty-flex-wrap align-items-center">
          {item.author.avatar && (
            <Avatar width="50px">
              <Image
                src={item.author.avatar}
                layout="fill"
                alt={item.author.name}
                objectFit="contain"
              />
            </Avatar>
          )}
          <span className="ml-2">{item.author.name}</span>
        </div>
        <span>{moment(item.date_published).format("DD/MM/YYYY")}</span>
      </div>
      <div
        className="mt-3 lh-24"
        dangerouslySetInnerHTML={{ __html: item.content_html }}
      />
      <CommentForm newsItem={item} changeComCounter={changeComCounter} />
      <div className="my-4 ty-col-16 mx-auto">
        {comments.map((item, index) => (
          <div
            className="my-3 border-radius-15 ty-border full-width"
            key={index}
          >
            <CommentItem
              CItem={item}
              newsItem={item}
              changeComCounter={changeComCounter}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
