import { z } from "zod";

const RecipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingrediants: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});

export default RecipeSchema;
