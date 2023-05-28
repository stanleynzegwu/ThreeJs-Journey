<!-- remove() ==> removeBody() -->

In the "cannon" library, you can use the remove() method to remove a body from the world, like this: world.remove(body).

However, in the "cannon-es" library, the method has been renamed to removeBody(). Therefore, in "cannon-es," you would use world.removeBody(body) to achieve the same result.

<!-- World.hasActiveBodies: boolean -->

Added a property World.hasActiveBodies: boolean which will be false when all physics bodies are sleeping. This allows for invalidating frames when physics aren't active for increased performance.
Add support for Trigger bodies.
