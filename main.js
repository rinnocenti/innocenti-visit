import { Visitar } from './scripts/visitar.js';

Hooks.once("init", () => {
    game.socket.on(`module.innocenti-visit`, (data) => {
        let actor = game.actors.entities.find(a => a.name === data.token);
        if (!actor) return ui.notifications.error(`Permission: Actor of ${data.token} not found`);
        let newpermissions = duplicate(actor.data.permission);
        newpermissions[`${data.userid}`] = 2;
        let permissions = new PermissionControl(actor);
        permissions._updateObject(event, newpermissions);
    });
});
window.InnocentiVisitar = {
    Visitar: Visitar
}