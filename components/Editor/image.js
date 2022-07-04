import { Image } from "@chakra-ui/react";
import { Entity } from "draft-js";

const ImageElement = (props) => {
  return <Image src={props.src} alt="" />;
};

export const ImageMedia = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));

  const { src } = entity.getData();
  const type = entity.getType();

  console.log("src", src);

  let media;
  if (type === "image") {
    media = <ImageElement src={src} />;
  }

  console.log("media", media);

  return media;
};
