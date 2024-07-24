import React from "react";
import { client } from "../utils/sanity/client";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    try {
      const categoriesData = await client.fetch(
        `*[_type == "category"]{_id, name, slug, date}`
      );
      this.setState({ categories: categoriesData });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  render() {
    const { categories } = this.state;

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1>Categories</h1>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <p>Name: {category.name}</p>
                <p>Date: {new Date(category.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <img
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
              />
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
