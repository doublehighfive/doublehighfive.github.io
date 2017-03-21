ig.module(
    'game.entities.victoria'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {
        EntityVictoria = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/victoriaspritesheet.png', 32, 64),
            gravityFactor: 0,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            startPosition: null,

            init: function(x, y, settings) {
                this.addAnim('talk', 1, [0, 1]);
                this.parent(x, y, settings);
            },
        });
    });