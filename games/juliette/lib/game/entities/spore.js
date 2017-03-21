ig.module(
    'game.entities.spore'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {
        EntitySpore = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/sporesprites.png', 16, 16),
            gravityFactor: 0,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,

            startPosition: null,

            init: function(x, y, settings) {
                this.addAnim('still', 1, [0, 1]);

                if (settings.check) {
                    this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                    delete settings.check;
                }

                this.parent(x, y, settings);
            },

            check: function(other) {
                other.kill();
            }
        });
    });