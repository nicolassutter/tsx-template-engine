import PropTypes, { InferProps } from 'prop-types'
import ReactDOMServer from 'react-dom/server'

type Payload = Record<string, { type: any, default?: any }>

/**
 * Converts the given Record to a 'prop-types' equivalent
 */
export type ToPropTypes<
  R extends Record<string, any>
> = {
  [Key in keyof R]-?: PropTypes.Validator<R[Key]> | PropTypes.Requireable<R[Key]>
}

/**
 * Allows the same syntax as Vue
 *
 * @returns Both the defaultProps and the types for `Component.defaultProps` and `Component.propTypes`
 */
export const getProps = <T extends Payload>(payload: () => T) => {
  const params = payload()
  const defaultProps = Object.fromEntries(Object.entries(params).map(([k, val]) => [k, val.default])) as { [Key in keyof T]: T[Key]['default'] }

  type Children = { children?: PropTypes.ReactNodeLike }

  type Types = Required<InferProps<{ [Key in keyof T]: T[Key]['type'] }>>

  return {
    defaultProps: {
      children: undefined,
      ...defaultProps
    } as typeof defaultProps & Children,

    types: Object.fromEntries(
      Object.entries(params).map(([k, val]) => [k, val.type])
    ) as { [Key in keyof Types]: NonNullable<Types[Key]>} & Children
  }
}

/**
 * Renders to string a React component, and its props if required.
 */
export const renderComponent = <C extends (args: any) => JSX.Element>(component: C, args?: Parameters<C>[0]) => ReactDOMServer.renderToStaticMarkup(component(args))