# **My Web Application**

It started out as a basic web application developed when I wanted to learn web development

In the end, I ended up creating my own web application

## Preview

#### Home Page

![Home](test/snapshot/snapshot-images/pc/dark/home.png 'Home')

#### Projects Page

![Projects](test/snapshot/snapshot-images/pc/dark/projects.png 'Projects')

#### Contact Page

![Contact](test/snapshot/snapshot-images/pc/dark/contact.png 'contact')

#### Error Page

![error](test/snapshot/snapshot-images/pc/dark/error.png 'Error')

## Tech Used

| Aspect                                                                 | Name           |
| ---------------------------------------------------------------------- | -------------- |
| Development Language                                                   | TypeScipt      |
| Scripting Language                                                     | TypeScipt      |
| Testing                                                                | Vitest         |
| Styling                                                                | Material UI    |
| Framework                                                              | NextJS         |
| Build Automation Tool                                                  | Make           |
| Text Editor                                                            | NeoVim         |
| Dependency Management                                                  | Pnpm           |
| Continuous Integration, Continuous Delivery, and Continuous Deployment | GitHub Actions |

## How to build this app?

_*Make sure you have `pnpm` and `make` available in your system*_

### Environment Variables

#### Development and Testing

Run the following command

`make copy-env-[development/testing]`

#### Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

| Command                                           | Usage                                             |
| ------------------------------------------------- | ------------------------------------------------- |
| make start                                        | Start the bundled app                             |
| make generate                                     | Generate the file needed                          |
| make start-(development OR staging OR production) | Start development                                 |
| make build-(development OR staging OR production) | Bundle and build the app                          |
| make deploy-(staging OR production)               | Bundle, build and deploy the app                  |
| make install                                      | Install all dependencies                          |
| make test                                         | Run all test code                                 |
| make typecheck                                    | Run typechecking for source code                  |
| make lint                                         | Run linter for source and test code               |
| make format-check                                 | Run prettier to check source and test code format |
| make format                                       | Run prettier to format source and test code       |
