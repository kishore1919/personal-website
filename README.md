# **My Web Application**

It started out as a basic web application developed when I wanna learn web development

In the end, I ended up creating my own web application

Previously, it was a monorepo of my web application that consists of 3 main folders

1. Express for backend
2. React for frontend
3. Common for common types/functions shared by backend & frontend

Heroku will remove freemium services soon, so I decided to rewrite my website in `NextJS`

## Preview

<details>
<summary>Click to preview!</summary>

#### Main Page

![Home](docs/home.png 'Home')

#### Portfolio Page

![Portfolio](docs/portfolio.png 'Portfolio')

#### About Page

![About](docs/about.png 'About')

#### Contact Page

![Contact](docs/contact.png 'Contact')

#### Resume Page

![Resume](docs/resume.png 'Resume')

#### Last but not least, footer

![Footer](docs/footer.png 'Footer')

</details>

## Tech Used

| Aspect                                                                 | Name              |
| ---------------------------------------------------------------------- | ----------------- |
| Development Language                                                   | TypeScipt         |
| Scripting Language                                                     | TypeScipt         |
| Testing                                                                | Jest & Esbuild    |
| Styling                                                                | Styled-components |
| Framework                                                              | NextJS            |
| Build Automation Tool                                                  | Make              |
| Text Editor                                                            | NeoVim            |
| Dependency Management                                                  | Yarn              |
| Continuous Integration, Continuous Delivery, and Continuous Deployment | GitHub Actions    |

## How to build this app?

_*Make sure you have `yarn` and `make` available in your system*_

### Environment Variables

#### Development and Testing

1. Refer to `.env.example` which is an example file for you to know what key-value pairs are needed to develop this project
2. Then, create an `.env` file that will be used for development and testing. Then copy the key-value pairs to it and then add the values

#### Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

| Command           | Usage                                             |
| ----------------- | ------------------------------------------------- |
| make start        | Start the bundled app                             |
| make generate     | Generate the file needed                          |
| make dev          | Start development                                 |
| make install      | Install all dependencies                          |
| make test         | Run all test code                                 |
| make build        | Bundle and build the app                          |
| make typecheck    | Run typechecking for source code                  |
| make lint         | Run linter for source and test code               |
| make format-check | Run prettier to check source and test code format |
| make format       | Run prettier to format source and test code       |
