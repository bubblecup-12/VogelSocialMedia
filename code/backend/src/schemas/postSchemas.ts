import { z } from "zod";

export const PostStatusEnum = z.enum([
  "HIDDEN",
  "PUBLIC",
  "PRIVATE",
  "ARCHIVED",
]);

export const uploadPostSchema = z.object({
  description: z.string(),
  status: PostStatusEnum,
  // this is hilarious but it works
  // if the value is a string, convert it to an array
  // if the value is an array, return it as is
  // this is just a workaround for the fact that swagger is not fucking able to handle arrays
  tags: z.preprocess((val) => {
    if (typeof val === "string") {
      return [val]; // Single tag string
    } else if (Array.isArray(val)) {
      return val; // Multiple tags
    } else {
      return []; // Optional: fallback for undefined/null
    }
  }, z.array(z.string())),
});
