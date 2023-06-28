after adding this  
<mesh geometry={poleLightA.geometry} position={nodes.poleLightA.position}>
<meshBasicMaterial color={"#ffffe5"} />
</mesh>

<mesh geometry={poleLightB.geometry} position={nodes.poleLightB.position}>
    <meshBasicMaterial color={"#ffffe5"} />
</mesh>

i found out that the emmisive lights seemed they are not in the right position. However, the baked model wasn't at the center of the scene and you needed to apply the position on it, like we did for the lights To fix the issue . so i added position={nodes.baked.position}

<mesh geometry={baked.geometry} position={nodes.baked.position}>
    <meshBasicMaterial
      map={bakedTexture}
      // map-flipY={false}
    />
</mesh>
