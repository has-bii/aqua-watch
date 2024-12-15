import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wifi/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wifi/"!</div>
}
