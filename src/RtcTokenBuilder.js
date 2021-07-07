const AccessToken = require('../src/AccessToken').AccessToken
const Priviledges = require('../src/AccessToken').priviledges
const Role = {
    // DEPRECATED. Role::ATTENDEE has the same privileges as Role.PUBLISHER.
    ATTENDEE: 0,

    // RECOMMENDED. Use this role for a voice/video call or a live broadcast, if your scenario does not require authentication for [Hosting-in](https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#hosting-in).
    PUBLISHER: 1,

    /* Only use this role if your scenario require authentication for [Hosting-in](https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#hosting-in).
     * @note In order for this role to take effect, please contact our support team to enable authentication for Hosting-in for you. Otherwise, Role.SUBSCRIBER still has the same privileges as Role.PUBLISHER.
     */
    SUBSCRIBER: 2,

    // DEPRECATED. Role.ADMIN has the same privileges as Role.PUBLISHER.
    ADMIN: 101
}
class RtcTokenBuilder {
    static buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs) {
        return this.buildTokenWithAccount(appID, appCertificate, channelName, uid, role, privilegeExpiredTs)
    }
    static buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs) {
        this.key = new AccessToken(appID, appCertificate, channelName, account)
        this.key.addPriviledge(Priviledges.kJoinChannel, privilegeExpiredTs)
        if (role == Role.ATTENDEE ||
            role == Role.PUBLISHER ||
            role == Role.ADMIN) {
            this.key.addPriviledge(Priviledges.kPublishAudioStream, privilegeExpiredTs)
            this.key.addPriviledge(Priviledges.kPublishVideoStream, privilegeExpiredTs)
            this.key.addPriviledge(Priviledges.kPublishDataStream, privilegeExpiredTs)
        }
        return this.key.build();
    }
}

module.exports.RtcTokenBuilder = RtcTokenBuilder;
module.exports.Role = Role;