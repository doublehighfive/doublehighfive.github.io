ig.module(
    'game.entities.player'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){
        EntityPlayer = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/player.png', 32, 96 ),
            offset: {x: 0, y: 32},
            size: {x: 32, y: 64},
            flip: false,
            maxVel: {x: 200, y: 300},
            friction: {x: 600, y: 0},
            accelGround: 300,
            accelAir: 200,
            jump: 200,
            swimming: false,
            flying: false,
            climbing: false,
            rotated: false,
            level3: false,
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
                this.addAnim('idle', 1, [1]);
                this.addAnim('run', .3, [0, 1, 2, 3]);
                this.addAnim('jump', 1, [7]);
                this.addAnim('fall', 0.4, [4,5]);
                this.addAnim('shoot', 1, [8]);
                this.addAnim('fly', .3, [12,13]);
                this.addAnim('climb', .3, [14,15]);
                this.addAnim('swim', .3, [10,11]);
            },
            update: function() {
                // move left or right
                var accel = this.standing ? this.accelGround : this.accelAir;
                if( ig.input.state('left') ) {
                    this.accel.x = -accel;
                    this.flip = true;
                }else if( ig.input.state('right') ) {
                    this.accel.x = accel;
                    this.flip = false;
                }else{
                    this.accel.x = 0;
                    this.accel.y = 0;
                }

                if (this.swimming) {
                        this.currentAnim = this.anims.swim;
                    if (!this.rotated) {
                        if (this.flip) {
                            if (this.currentAnim.angle != 0) {
                                this.currentAnim.angle -= Math.PI;
                            } else {
                                this.currentAnim.angle -= Math.PI / 2;
                            }
                        } else {
                            if (this.currentAnim.angle != 0) {
                                this.currentAnim.angle -= Math.PI;
                            } else {
                                this.currentAnim.angle += Math.PI / 2;
                            }
                        }
                        this.rotated = true;
                    }

                    if (ig.input.state('jump')) {
                        this.accel.y = -accel;
                    } else if (ig.input.state('down')) {
                        this.accel.y = accel;
                    }

                } else if (this.flying) {
                    this.gravityFactor = .4;
                    this.currentAnim = this.anims.fly;

                    //allow movement up and down
                    if (ig.input.state('jump')) {
                        this.accel.y = -accel;
                    } else if (ig.input.state('down')) {
                        this.accel.y = accel;
                    }

                } else if (this.climbing) {
                  this.gravityFactor = 0;
                    //allow movement up and down
                    if (ig.input.state('jump')) {
                        this.accel.y = -accel;
                    } else if (ig.input.state('down')) {
                        this.accel.y = accel;
                    }
                } else {

                    // jump
                    if( this.standing && ig.input.pressed('jump') ) {
                        this.jumpFunction();
                    }

                    // shoot
                    if (ig.input.pressed('shoot')) {
                        ig.game.spawnEntity("EntitySpell", this.pos.x, this.pos.y + 32, {flip: this.flip});
                        this.currentAnim = this.anims.shoot;
                    } else {

                        // set the current animation, based on the player's speed
                        if (this.vel.y < 0) {
                            this.currentAnim = this.anims.jump;
                        } else if (this.vel.y > 0) {
                            this.currentAnim = this.anims.fall;
                        } else if (this.vel.x != 0) {
                            this.currentAnim = this.anims.run;
                        } else {
                            this.currentAnim = this.anims.idle;
                        }
                    }
                }
                this.currentAnim.flip.x = this.flip;
                // move!
                this.parent();
            },
            jumpFunction: function() {
                this.vel.y = -this.jump;
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

            },
            receiveDamage: function(amount, from){
                if(this.invincible)
                    return;
                this.parent(amount, from);
            },
            draw: function(){
                this.parent();
            }

        });

        EntitySpell = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/spellspritesheet.png', 8, 8 ),
            maxVel: {x: 500, y: 0},
            mass: 0,
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim( 'idle', 0.2, [0,1] );
                this.currentAnim = this.anims.idle;
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y  ){
                    this.kill();
                }
            },
            check: function( other ) {
                other.receiveDamage( 1, this );
                this.kill();
            }
        });

        EntityDagger = ig.Entity.extend({
            size: {x: 4, y: 4},
            offset: {x: 2, y: 2},
            animSheet: new ig.AnimationSheet( 'media/daggerspritesheet.png', 8, 8 ),
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.BOTH,
            collides: ig.Entity.COLLIDES.PASSIVE,
            maxVel: {x: 200, y: 200},
            bounciness: 0.6,
            bounceCounter: 0,
            init: function( x, y, settings ) {
                this.parent( x + (settings.flip ? -4 : 7), y, settings );
                this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.vel.y = -(50 + (Math.random()*100));
                this.addAnim( 'spin', 0.2, [0,1,2,3] );
                this.addAnim('idle', 1, [0]);
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y ) {
                    // only bounce 3 times
                    this.bounceCounter++;
                    this.currentAnim = this.anims.idle;
                    if( this.bounceCounter > 3 ) {
                        this.kill();
                    }
                }
            },
            check: function( other ) {
                other.receiveDamage( 10, this );
                this.kill();
            },
            kill: function(){
                this.parent();
            }
        });

    });
