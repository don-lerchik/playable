let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    AnimatedSprite = PIXI.AnimatedSprite,
    Texture = PIXI.Texture;


const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


function setup() {
    Manager.initialize(640, 1136, 0xFFF)
    window.id = resources["images/atlas.json"].textures;
    const gameScene = new GameScene();
    Manager.changeScene(gameScene);
}

class Manager {
    constructor() { }
    get width() {
        return Manager._width;
    }
    get height() {
        return Manager._height;
    }

    static initialize(width, height, background) {

        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application({
            resolution: window.devicePixelRatio || 1,
            backgroundColor: background,
            width: width,
            height: height
        });
        console.log(width)
        document.body.appendChild(Manager.app.view);
        Manager.app.ticker.add(Manager.update)

        // window.addEventListener("resize", Manager.resize);
        // Manager.resize();
    }

    static resize() {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;
        Manager.app.view.style.width = `${enlargedWidth}px`;
        Manager.app.view.style.height = `${enlargedHeight}px`;
        Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
        Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    static changeScene(newScene) {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }
    static update(framesPassed) {
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}

class GameScene extends Container {
    constructor() {
        super();
        this.background = new Sprite.from("./images/floor_old.jpg");
        this.backLayer = new Container();
        this.backLayer.mask = new Graphics()
            .beginFill()
            .drawRect(0, 0, this.background.width, this.background.height)
            .endFill();
        this.addChild(this.backLayer);
        this.backLayer.addChild(this.background);

        this.carpetOld = new Sprite(id["carpet_old.png"]);
        this.carpetOld.position.set(100, 320);
        this.backLayer.addChild(this.carpetOld);

        this.ladderOld = new Sprite(id["ladder_old.png"]);
        this.ladderOld.position.set(240, 290);
        this.backLayer.addChild(this.ladderOld);

        this.bookTable = new Sprite(id["book_table.png"]);
        this.bookTable.position.set(50, 30);
        this.backLayer.addChild(this.bookTable);

        this.plant1 = new Sprite(id["plant_1.png"]);
        this.plant1.position.set(-30, 120);
        this.backLayer.addChild(this.plant1);

        this.sofa = new Sprite(id["sofa.png"]);
        this.sofa.position.set(-80, 700);
        this.backLayer.addChild(this.sofa);

        this.tableOld = new Sprite(id["table_old.png"]);
        this.tableOld.position.set(35, 540);
        this.backLayer.addChild(this.tableOld);

        this.install = new Sprite(id["install.png"]);
        this.install.anchor.set(0.5, 0.5)
        this.install.position.set(this.background.width / 2, 900);
        this.backLayer.addChild(this.install);
        // this.installScale = 1;
        // this.installPlank = false;

        this.homeScapes = new Sprite(id["home_scapes.png"]);
        this.homeScapes.anchor.set(0.5, 0.5)
        this.homeScapes.scale.x = 0;
        this.homeScapes.scale.y = 0;
        this.homeScapes.position.set(this.background.width / 2, 60);
        this.backLayer.addChild(this.homeScapes);

        this.repair = new Sprite(id["repair.png"]);
        this.repair.position.set(430, 370);
        this.repair.alpha = 0;
        this.backLayer.addChild(this.repair);
        this.repair.interactive = true;
        this.repair.cursor = 'pointer';
        this.repair.on("click", this.onClickyRepare, this);

        this.dialog1 = new Sprite(id["dialog_1.png"]);
        this.dialog2 = new Sprite(id["dialog_2.png"]);
        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 26,
            lineHeight: 30,
            align: "center",
            fontWeight: "bold",
            fill: "#833123",
            wordWrap: !0,
            direction: "rtl",
            wordWrapWidth: this.dialog1.width - 10
        });
        const phrase = 'Our house is in terrible shape.\nHelp me fix it up!'
        this.text = new PIXI.Text(phrase, style);
        this.text.anchor.set(.5);
        this.text.x = this.dialog1.width / 2;
        this.text.y = this.dialog1.height / 2;
        this.dialog1.position.set(70, 140);
        this.dialog2.position.set(this.dialog1.width - 1, 65);
        this.dialog1.addChild(this.text);
        this.dialog1.addChild(this.dialog2);
        this.dialog1.alpha = 0;
        this.backLayer.addChild(this.dialog1);


        const ostinWavingFrames = [
            "ostin_waving_1.png",
            "ostin_waving_2.png",
            "ostin_waving_3.png",
            "ostin_waving_4.png",
            "ostin_waving_5.png",
            "ostin_waving_6.png",
            "ostin_waving_7.png",
            "ostin_waving_8.png",
            "ostin_waving_9.png",
            "ostin_waving_10.png",
            "ostin_waving_11.png",
            "ostin_waving_12.png",
            "ostin_waving_13.png",
            "ostin_waving_14.png",
            "ostin_waving_13.png",
            "ostin_waving_12.png",
            "ostin_waving_11.png",
            "ostin_waving_10.png",
            "ostin_waving_9.png",
            "ostin_waving_8.png",
            "ostin_waving_7.png",
            "ostin_waving_6.png",
            "ostin_waving_5.png",
            "ostin_waving_4.png",
            "ostin_waving_3.png",
            "ostin_waving_2.png",
            "ostin_waving_1.png",
        ];
        this.animatedOstinWaving = new AnimatedSprite(ostinWavingFrames.map((stringy) => Texture.from(stringy)));
        this.animatedOstinWaving.scale.x *= -1;
        this.animatedOstinWaving.position.set(630, 20);
        this.backLayer.addChild(this.animatedOstinWaving);
        this.animatedOstinWaving.animationSpeed = .4;

        const ostinClapsFrames = [
            "ostin_claps_1.png",
            "ostin_claps_2.png",
            "ostin_claps_3.png",
            "ostin_claps_4.png",
            "ostin_claps_5.png",

            "ostin_claps_repeat_1.png",
            "ostin_claps_repeat_2.png",
            "ostin_claps_repeat_3.png",
            "ostin_claps_repeat_4.png",
            "ostin_claps_repeat_5.png",
            "ostin_claps_repeat_6.png",
            "ostin_claps_repeat_7.png",

            "ostin_claps_repeat_1.png",
            "ostin_claps_repeat_2.png",
            "ostin_claps_repeat_3.png",
            "ostin_claps_repeat_4.png",
            "ostin_claps_repeat_5.png",
            "ostin_claps_repeat_6.png",
            "ostin_claps_repeat_7.png",

            "ostin_claps_repeat_1.png",
            "ostin_claps_repeat_2.png",
            "ostin_claps_repeat_3.png",
            "ostin_claps_repeat_4.png",
            "ostin_claps_repeat_5.png",
            "ostin_claps_repeat_6.png",
            "ostin_claps_repeat_7.png",

            "ostin_claps_repeat_1.png",
            "ostin_claps_repeat_2.png",
            "ostin_claps_repeat_3.png",
            "ostin_claps_repeat_4.png",
            "ostin_claps_repeat_5.png",
            "ostin_claps_repeat_6.png",
            "ostin_claps_repeat_7.png",

            "ostin_claps_5.png",
            "ostin_claps_4.png",
            "ostin_claps_3.png",
            "ostin_claps_2.png",
            "ostin_claps_1.png",

        ];
        this.animatedOstinClaps = new AnimatedSprite(ostinClapsFrames.map((stringy) => Texture.from(stringy)));
        this.animatedOstinClaps.scale.x *= -1;
        this.animatedOstinClaps.position.set(630, 50);
        this.animatedOstinClaps.alpha = 0;
        this.backLayer.addChild(this.animatedOstinClaps);
        this.animatedOstinClaps.animationSpeed = .4;


        this.hand = new Sprite(id["hand.png"]);
        this.hand.anchor.set(.5);
        this.hand.rotation = 1;
        this.hand.alpha = 0;
        this.hand.position.set(300, 600);
        this.backLayer.addChild(this.hand);

        this.changeModal1 = new Sprite();
        this.changeModal2 = new Sprite();
        this.changeModal3 = new Sprite();

        this.changeModalNoActive1 = new Sprite(id["change_modal_noActive.png"]);
        this.changeModalActive1 = new Sprite(id["change_modal_active.png"]);
        this.changeModalNoActive1.anchor.set(.5);
        this.changeModalActive1.anchor.set(.5);

        this.changeModalNoActive2 = new Sprite(id["change_modal_noActive.png"]);
        this.changeModalActive2 = new Sprite(id["change_modal_active.png"]);
        this.changeModalNoActive2.anchor.set(.5);
        this.changeModalActive2.anchor.set(.5);

        this.changeModalNoActive3 = new Sprite(id["change_modal_noActive.png"]);
        this.changeModalActive3 = new Sprite(id["change_modal_active.png"]);
        this.changeModalNoActive3.anchor.set(.5);
        this.changeModalActive3.anchor.set(.5);

        this.iconLadder1 = new Sprite(id["icon_ladder_1.png"]);
        this.iconLadder2 = new Sprite(id["icon_ladder_2.png"]);
        this.iconLadder3 = new Sprite(id["icon_ladder_3.png"]);

        this.iconLadder1.anchor.set(.5);
        this.changeModalActive1.alpha = 0;

        this.iconLadder2.anchor.set(.5);
        this.changeModalActive2.alpha = 0;

        this.iconLadder3.anchor.set(.5);
        this.changeModalActive3.alpha = 0;

        this.changeModal1.addChild(this.changeModalNoActive1);
        this.changeModal1.addChild(this.changeModalActive1);
        this.changeModal1.addChild(this.iconLadder1);
        this.changeModal1.position.set(190, 330);
        this.changeModal1.anchor.set(.5);
        this.changeModal1.scale.x = 0;
        this.changeModal1.scale.y = 0;
        this.changeModal1.interactive = true;
        this.changeModal1.cursor = 'pointer';
        this.changeModal1.on("click", (evt) => { this.onClickyChange(evt, { type: 1 }) }, this);

        this.changeModal2.addChild(this.changeModalNoActive2);
        this.changeModal2.addChild(this.changeModalActive2);
        this.changeModal2.addChild(this.iconLadder2);
        this.changeModal2.position.set(315, 220);
        this.changeModal2.anchor.set(.5);
        this.changeModal2.scale.x = 0;
        this.changeModal2.scale.y = 0;
        this.changeModal2.interactive = true;
        this.changeModal2.cursor = 'pointer';
        this.changeModal2.on("click", (evt) => { this.onClickyChange(evt, { type: 2 }) }, this);

        this.changeModal3.addChild(this.changeModalNoActive3);
        this.changeModal3.addChild(this.changeModalActive3);
        this.changeModal3.addChild(this.iconLadder3);
        this.changeModal3.position.set(470, 180);
        this.changeModal3.anchor.set(.5);
        this.changeModal3.scale.x = 0;
        this.changeModal3.scale.y = 0;
        this.changeModal3.interactive = true;
        this.changeModal3.cursor = 'pointer';
        this.changeModal3.on("click", (evt) => { this.onClickyChange(evt, { type: 3 }) }, this);


        this.backLayer.addChild(this.changeModal1);
        this.backLayer.addChild(this.changeModal2);
        this.backLayer.addChild(this.changeModal3);

        this.ok = new Sprite(id["ok.png"]);
        this.okPlate = new Sprite(id["ok_plate.png"]);
        this.okPlate.anchor.set(.5);
        this.ok.x = -30;
        this.ok.y = -20;
        this.okPlate.addChild(this.ok);
        this.okPlate.alpha = 0;
        this.okPlate.interactive = true;
        this.okPlate.cursor = 'pointer';
        this.backLayer.addChild(this.okPlate);
        this.okPlate.on("click", (evt) => { this.onClickyEndGame(evt, this.currentType) }, this);

        this.delta = 150;
        this.ladderBase1 = new Sprite(id["ladder_1_base.png"]);
        this.ladderCarpet1 = new Sprite(id["ladder_1_carpet.png"]);
        this.ladderRailings1 = new Sprite(id["ladder_1_railings.png"]);
        this.ladderBase1.position.set(300, this.delta);
        this.ladderCarpet1.position.set(300, this.delta);
        this.ladderRailings1.position.set(300, this.delta);
        this.ladderBase1.alpha = 0;
        this.ladderCarpet1.alpha = 0;
        this.ladderRailings1.alpha = 0;
        this.backLayer.addChild(this.ladderBase1);
        this.backLayer.addChild(this.ladderCarpet1);
        this.backLayer.addChild(this.ladderRailings1);

        this.ladderBase2 = new Sprite(id["ladder_2_base.png"]);
        this.ladderCarpet2 = new Sprite(id["ladder_2_carpet.png"]);
        this.ladderRailings2 = new Sprite(id["ladder_2_railings.png"]);
        this.ladderBase2.position.set(300, this.delta);
        this.ladderCarpet2.position.set(300, this.delta);
        this.ladderRailings2.position.set(300, this.delta);
        this.ladderBase2.alpha = 0;
        this.ladderCarpet2.alpha = 0;
        this.ladderRailings2.alpha = 0;
        this.backLayer.addChild(this.ladderBase2);
        this.backLayer.addChild(this.ladderCarpet2);
        this.backLayer.addChild(this.ladderRailings2);

        this.ladderBase3 = new Sprite(id["ladder_3_base.png"]);
        this.ladderCarpet3 = new Sprite(id["ladder_3_carpet.png"]);
        this.ladderRailings3 = new Sprite(id["ladder_3_railings.png"]);
        this.ladderBase3.position.set(300, this.delta);
        this.ladderCarpet3.position.set(300, this.delta);
        this.ladderRailings3.position.set(300, this.delta);
        this.ladderBase3.alpha = 0;
        this.ladderCarpet3.alpha = 0;
        this.ladderRailings3.alpha = 0;
        this.backLayer.addChild(this.ladderBase3);
        this.backLayer.addChild(this.ladderCarpet3);
        this.backLayer.addChild(this.ladderRailings3);

        this.currentType = 0;

        this.plant2 = new Sprite(id["plant_2.png"]);
        this.plant2.position.set(550, 670);
        this.backLayer.addChild(this.plant2);

        this.finalModal = new Sprite.from("./images/final_modal.png");
        this.finalModal.anchor.set(0.5, 0.5)
        this.finalModal.scale.x = 0;
        this.finalModal.scale.y = 0;
        this.finalModal.position.set(this.background.width / 2, this.background.height / 2-100);
        this.addChild(this.finalModal);

        this.blurFilter = new PIXI.filters.BlurFilter();
        this.backLayer.filters = [this.blurFilter];
        this.blurFilter.blur = 0;

        this.tl_1 = new TimelineMax({ repeat: -1 });
        this.tl_1.to(this.install.scale, 1,
            {
                x: 1.2,
                y: 1.2,
                z: 1.2,
            })
            .to(this.install.scale, 1.2,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                });
        this.tl_3 = new TimelineMax({ repeat: -1 });
        this.tl_3.to(this.hand, 1,
            {
                x: 350,
                y: 550,
            })
            .to(this.hand, 1,
                {
                    x: 300,
                    y: 600,
                });
        this.tl_2 = new TimelineMax();
        this.tl_2.to(this.homeScapes.scale, 0.3, {
            x: 1,
            y: 1,
            z: 1,
            ease: Back.easeOut
        }).delay(0.8)
            .to(this.repair, 0.2, {
                alpha: 1,
                y: 440,
                ease: Back.easyIn,
            })
            .to(this.repair, 0.1, {
                y: 425,
                ease: Back.easeOut,
            })
            .to(this.repair, 0.1, {
                y: 440,
                ease: Back.easyIn,
            })
            .to(this.repair, 0.1, {
                y: 437,
                ease: Back.easeOut,
            })
            .to(this.repair, 0.1, {
                y: 440,
                ease: Back.easyIn,
                yoyo: true,
            }).delay(0.1)
            .to(this.dialog1, 0.5, {
                alpha: 1,
                ease: Back.easeOut,
                y: 130,
            }).delay(0.2)
            .to(this.animatedOstinWaving, 0.1, {
                play: true,
                loop: false,
            })
            .to(this.hand, 1, {
                alpha: 1,
                ease: Back.easeOut,
            });

        this.tl_3 = new TimelineMax();
        this.tl_4 = new TimelineMax();


    }
    update(framesPassed) {
        // this.animateInstall()
    }
    onClickyRepare() {
        this.tl_3.to([this.hand, this.dialog1, this.repair], 0.5, {
            alpha: 0,
            ease: Back.easeOut,
        }).to(this.repair.scale, 0.01, {
            x: 0,
            y: 0,
            z: 0,
        })
            .staggerTo([this.changeModal1.scale, this.changeModal2.scale, this.changeModal3.scale], 0.35, {
                x: 1.2,
                y: 1.2,
                ease: Back.easeOut
            }, 0.15)
    }

    onClickyChange(evt, objectType) {
        const { type } = objectType;
        if (type === this.currentType) return false
        this.currentType = type;
        this.okPlate.alpha = 0;
        this.resetActiveLadder();
        if (type === 1) {
            this.changeModalActive1.alpha = 1;
            this.okPlate.position.set(this.changeModal1.x + this.changeModal1.width / 2, this.changeModal1.y + 150);
            this.tl_2.to(this.okPlate, 0.2, {
                alpha: 1,
                ease: Back.easeOut,
                y: this.changeModal1.y + 100,
            }).to(this.ladderOld, 0.1, {
                alpha: 0,
            })
                .staggerTo([this.ladderBase1, this.ladderCarpet1, this.ladderRailings1], 0.5, {
                    alpha: 1,
                    ease: Back.easeOut,
                    y: this.ladderBase1.y + 50,
                }, 0.2)

        }
        if (type === 2) {
            this.changeModalActive2.alpha = 1;
            this.okPlate.position.set(this.changeModal2.x + this.changeModal2.width / 2, this.changeModal2.y + 150);
            this.tl_2.to(this.okPlate, 0.2, {
                alpha: 1,
                ease: Back.easeOut,
                y: this.changeModal2.y + 100,
            }).to(this.ladderOld, 0.1, {
                alpha: 0,
            })
                .staggerTo([this.ladderBase2, this.ladderCarpet2, this.ladderRailings2], 0.5, {
                    alpha: 1,
                    ease: Back.easeOut,
                    y: this.ladderBase1.y + 50,
                }, 0.2)
        }
        if (type === 3) {
            this.changeModalActive3.alpha = 1;
            this.okPlate.position.set(this.changeModal3.x + this.changeModal3.width / 2, this.changeModal3.y + 150);
            this.tl_2.to(this.okPlate, 0.2, {
                alpha: 1,
                ease: Back.easeOut,
                y: this.changeModal3.y + 100,
            }).to(this.ladderOld, 0.1, {
                alpha: 0,
            })
                .staggerTo([this.ladderBase3, this.ladderCarpet3, this.ladderRailings3], 0.5, {
                    alpha: 1,
                    ease: Back.easeOut,
                    y: this.ladderBase1.y + 50,
                }, 0.2)
        }
    }

    resetActiveLadder() {
        for (let index = 1; index <= 3; index++) {
            this[`changeModalActive${index}`].alpha = 0;
            this[`ladderBase${index}`].alpha = 0
            this[`ladderBase${index}`].y = this.delta;
            this[`ladderCarpet${index}`].alpha = 0
            this[`ladderCarpet${index}`].y = this.delta;
            this[`ladderRailings${index}`].alpha = 0
            this[`ladderRailings${index}`].y = this.delta;
        }
    }

    onClickyEndGame() {
        this.tl_4.to(this.okPlate, 0.1, {
            alpha: 0,
            ease: Back.easeOut,
        }).staggerTo([this.changeModal3.scale, this.changeModal2.scale, this.changeModal1.scale], 0.35, {
            x: 0,
            y: 0,
            ease: Back.easyIn
        }, 0.15)
            .to(this.animatedOstinWaving, 0.01, {
                alpha: 0
            })
            .to(this.animatedOstinClaps, 0.01, {
                alpha: 1,
                play: true,
                loop: false,
            })
            .to(this.blurFilter, 2, {
               blur: 5,
            })
            .to(this.finalModal.scale, 0.3, {
                x: 1,
                y: 1,
                ease: Back.easyIn,
            })
    }
    // animateInstall() {
    //     if (this.installPlank) {
    //         this.installScale -= 0.002;
    //     } else {
    //         this.installScale += 0.002;
    //     }
    //     this.install.scale.x = this.installScale;
    //     this.install.scale.y = this.installScale;
    //     if (this.installScale >= 1.1) {
    //         this.installPlank = true;
    //     }
    //     if (this.installScale <= 1) {
    //         this.installPlank = false;
    //     }
    // }
}

loader
    .add("images/atlas.json")
    .add("./images/floor_old.jpg")
    .load(() => {
        setup()
    });

