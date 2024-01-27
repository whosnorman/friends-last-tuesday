
// BLOCKS 

const canvas = document.getElementById("canvas-container");

// module aliases
var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: canvas,
        engine: engine,
        options: {
            width: 400,
            height: 560,
            showAngleIndicator: false,
            background: 'transparent',
            wireframeBackground: 'transparent',
            wireframes: false,

        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(325, 535, 3, 3, 0, 0, function(x, y) {
        var sides = Math.round(Common.random(1, 8));

        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 0,
            };
        }

        // switch (Math.round(Common.random(0, 1))) {
        // case 0:
        //     if (Common.random() < 0.8) {
        //         return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { render: {fillStyle: "black"}});
        //     } else {
        //         return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
        //     }
        // case 1:
        //     return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
        // }
      
        return Bodies.rectangle(x, y, 80, 60, { render: {strokeStyle: '#000000', fillStyle: "#fffacd", lineWidth: 8}});
    });

    World.add(world, stack);

    World.add(world, [
        // walls
        Bodies.rectangle(400, -290, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 890, 800, 50, { isStatic: true }),
        Bodies.rectangle(830, 300, 50, 1120, { isStatic: true }),
        Bodies.rectangle(-30, 300, 50, 1120, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

engine.world.gravity.x = 0.05;
engine.world.gravity.y = -0.1;
engine.world.gravity.isPoint = true;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);