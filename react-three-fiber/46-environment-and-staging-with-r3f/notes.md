//Accumulative shadows

- From my deductions, the accumulative shadows is not great for animated objects, beacuse there are delays for the last shadow against the first shadow and you'll notice the delay

-it also takes it's bite on performances too

so you might decisde to use the Accumulative shadows for static scenes or slow moving scene BUT keep an eye on PERFORMANCE

//ContactShadows

- the ContactShadow will render our scene seen from below and use that information to generate the shadow. This shadow will then be blurred. For a small scene, the performances should be good, but for a more complex scene, this process might be too heavy and result in a frame rate drop especially since it has to be done on each frame.

Fortunately, there is a way to bake the shadow by setting the frames attribute on the <ContactShadow> to 1:

<ContactShadows> looks very good, but has limitations:

The shadows always comes from the front of the plane (positive y in our case).
It’s not physically accurate.
It blurs the shadow regardless of the distance from the objects.
It pulls quite a lot on the performance.
For simple object display, it’s great, but for more complex or realistic rendering, you might better use other shadow solutions.
