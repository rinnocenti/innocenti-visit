import { Visitar } from './scripts/visitar.js';

Hooks.once("init", () => {
    game.socket.on(`module.innocenti-visit`, (data) => {
        let actor = game.actors.entities.find(a => a.name === data.target);
        if (!actor) return ui.notifications.error(`Permission: Actor of ${target[i].name} not found`);
        let newpermissions = duplicate(actor.data.permission);
        newpermissions[`${data.userid}`] = 'observer';
        let permissions = new PermissionControl(actor);
        permissions._updateObject(event, newpermissions);
    });
});
window.Innocenti = {
    Visitar: Visitar
};