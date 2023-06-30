when you add <EffectComposer></EffectComposer> It has a normal pass on by default you can disable with disableNormalPass.
like so <EffectComposer disableNormalPass></EffectComposer> (it greatly improves performance)

what i found out is that DepthOfField cost so so much in performance (when you use disableNormalPass on the EffectComposer it improves performance)

- SSR isn't working at the time of testing. It's probably beacuse of change in three or postprocessing. i'll try to figure that out, then update here

- custom Effect is not working,it might same issue with the above. i'll figure that out the update accordinly
