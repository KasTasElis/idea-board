import { TIdea } from "./state/types";
import { uuid } from "./utils";

const mockIdeas: TIdea[] = [
  {
    id: uuid(),
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    title: "Adolor Sitamet",
    description:
      "Necessitatibus tempore impedit fuga, eveniet aliquam quo suscipit numquam.",
    createdAt: Date.now() + 10000,
  },
  {
    id: uuid(),
    title: "Consectetur Adipiscing",
    description: "Quo suscipit numquam esse temporibus cupiditate cum quod.",
    createdAt: Date.now() + 10000 * 20,
    updatedAt: Date.now() + 10000 * 50,
  },
  {
    id: uuid(),
    title: "Architecto error ullam!",
    description: "Placeat nesciunt aliquid ducimus, consequuntur consequatur.",
    createdAt: Date.now() + 10000 * 60,
  },
];

export { mockIdeas };
