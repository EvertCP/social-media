// Mock for @radix-ui/react-avatar
import * as React from "react"

const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return React.createElement('div', props);
};

const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return React.createElement('img', props);
};

const Fallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return React.createElement('div', props);
};

Root.displayName = "AvatarRoot";
Image.displayName = "AvatarImage";
Fallback.displayName = "AvatarFallback";

export { Root, Image, Fallback };
