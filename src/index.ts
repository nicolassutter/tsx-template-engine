import { renderComponent } from './utils'
import fs from 'fs'
import { resolve } from 'path'

(async () => {
  fs.rmSync(resolve(__dirname, '../dist'), { recursive: true })
  fs.mkdirSync(resolve(__dirname, '../dist'), { recursive: true })

  const pages_dir = resolve(__dirname, 'pages')
  const pages = fs.readdirSync(pages_dir)

  const components_dir = resolve(__dirname, 'components')
  const components = fs.readdirSync(components_dir)

  const defaultHead = {
    title: 'Document'
  }

  const generate = async (files: string[], dir: string, folder_name: string, useTemplate = false) => {
    fs.mkdirSync(resolve(__dirname, '../dist', folder_name), { recursive: true })

    for await (const file of files) {
      const { default: component, head = {} }: { default: (arg: any) => React.ReactElement, head: Partial<typeof defaultHead> } = await import(resolve(dir, file))

      const { title } = { ...defaultHead, ...head }
      const [name] = file.split('.tsx')

      const defaultProps = (component as any).defaultProps
      const render = renderComponent(component, defaultProps || {})

      const final_string = /* html */ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${title}</title>
        </head>
        <body>
          ${render}
        </body>
        </html>
      `

      fs.writeFileSync(resolve(__dirname, `../dist/${folder_name}/${name}.html`), useTemplate ? final_string : render)
    }
  }

  generate(pages, pages_dir, 'pages', true)
  generate(components, components_dir, 'components')
})()