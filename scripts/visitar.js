export let Visitar = async function () {
    if (canvas.tokens.controlled.length === 0)
        return ui.notifications.error("select a token");
    const target = game.user.targets.values().next().value;
    if (!target) {
        ui.notifications.warn("No token is targeted");
        return;
    }
    for (let targetToken of game.user.targets) {
        let flag = targetToken.actor.getFlag('lootsheetnpc5e', 'lootsheettype');// !== 'Merchant'
        //targetToken.actor.sheet.constructor.name !== SHEETVISIT
        if (flag !== undefined) {
            if (!game.user.isGM) {
                let targactor = await game.actors.entities.find(a => a.id === targetToken.actor.id);
                let perm = targactor.data.permission;
                if (!perm[`${game.user.id}`]) {
                    await game.socket.emit("module.innocenti-visit", { token: targactor.name, userid: game.user.id });
                    console.log("Registrando log");
                }
            }
            if (flag === 'Merchant') {
                let img = targetToken.actor.img || targetToken.data.img;
                let imgtk = targetToken.data.img || targetToken.actor.img;
                await ChatMessage.create({
                    content: `<h3><img src=\"${img}\" width=\"50px\" /> Bem Vindo à @Actor[${targetToken.actor.data._id}]{${targetToken.name}}</h3>`,
                    type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
                    speaker: ChatMessage.getSpeaker(),
                    flavor: `<h3><img src=\"${imgtk}\" width=\"30px\" /></h3>`
                });
                
            } else if (flag === 'Loot') {
                let img = targetToken.actor.img || targetToken.data.img;
                let imgtk = targetToken.data.img || targetToken.actor.img;
                await ChatMessage.create({
                    content: `<h3><img src=\"${img}\" width=\"50px\" /> Pilhou @Actor[${targetToken.actor.data._id}]{${targetToken.name}}</h3>`,
                    type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
                    speaker: ChatMessage.getSpeaker(),
                    flavor: `<h3><img src=\"${imgtk}\" width=\"30px\" /></h3>`
                });
            }
            //ui.notifications.info(targetToken.id)  
        }
        setTimeout(function () { targetToken._onClickLeft2() }, 500);
        //await targetToken._onClickLeft2();
    }    
}