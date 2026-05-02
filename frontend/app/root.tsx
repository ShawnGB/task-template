import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router'

export function ErrorBoundary() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? (error.data?.message ?? error.statusText)
    : error instanceof Error
      ? error.message
      : 'Something went wrong'

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Error</title>
      </head>
      <body>
        <h1>Unexpected Error</h1>
        <p>{message}</p>
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>App</title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
