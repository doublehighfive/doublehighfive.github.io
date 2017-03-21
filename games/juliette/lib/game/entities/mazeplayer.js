ig.module(
    'game.entities.mazeplayer'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityMazeplayer = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/mazeplayer.png', 32, 32 ),
            size: {x: 32, y: 32},
            flip: false,
            gravityFactor: 0,
            maxVel: {x: 100, y: 100},
            friction: {x: 0, y: 0},
            accelGround: 200,
            accelAir: 200,

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,

            startPosition: null,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.setupAnimation();
                this.startPosition = {x:x,y:y};
            },
            setupAnimation: function(){
                this.addAnim('runup', 1, [0]);
                this.addAnim('runright', 1, [1]);
                this.addAnim('rundown', 1, [2]);
                this.addAnim('runleft', 1, [3]);
            },
            update: function() {

                var accel = this.standing ? this.accelGround : this.accelAir;
                if( ig.input.state('left') ) {
                    this.accel.x = -accel;

                    this.currentAnim = this.anims.runleft;
                }else if( ig.input.state('right') ) {
                    this.accel.x = accel;
                    this.currentAnim = this.anims.runright;
                } else if (ig.input.state('jump')) {
                    this.accel.y = -accel;
                    this.currentAnim = this.anims.runup;
                } else if (ig.input.state('down')) {
                    this.accel.y = accel;
                    this.currentAnim = this.anims.rundown;
                }else{
                    this.accel.x = 0;
                    this.accel.y = 0;
                }

                // move!
                this.parent();
            },
            handleMovementTrace: function(res) {
                this.parent(res);
                if (res.collision.x) {
                    this.standing = true;
                }
            },
            kill: function(){
                this.parent();
                var x = this.startPosition.x;
                var y = this.startPosition.y;
                //ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:function(){ig.game.spawnEntity( EntityPlayer, x, y)}} );
            }
            ,
            receiveDamage: function(amount, from){

                this.parent(amount, from);
            },
            draw: function(){

                this.parent();
            }

        });

    });