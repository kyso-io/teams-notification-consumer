import { KysoEventEnum, KysoTeamsAddMemberEvent, KysoTeamsCreateEvent, KysoTeamsDeleteEvent, KysoTeamsRemoveMemberEvent, KysoTeamsUpdateMemberRolesEvent } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToTeamsChannel } from '../helpers'

@Controller()
export class TeamsController {
    @EventPattern(KysoEventEnum.TEAMS_ADD_MEMBER)
    async handleTeamsAddMember(kysoTeamsAddMemberEvent: KysoTeamsAddMemberEvent) {
        const { organization, team, user, frontendUrl, roles } = kysoTeamsAddMemberEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `User *${user.name}* added to the channel <${teamUrl}|${team.display_name}> with the ${
            roles.length > 1 ? `roles ${roles.map((role: string) => `*${role}*`).join(',')}` : `role *${roles[0]}*`
        }`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.TEAMS_UPDATE_MEMBER_ROLES)
    async handleTeamsUpdateMemberRoles(kysoTeamsUpdateMemberRolesEvent: KysoTeamsUpdateMemberRolesEvent) {
        const { organization, team, user, frontendUrl, previousRoles, currentRoles } = kysoTeamsUpdateMemberRolesEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `The roles of the User *${user.name}* have been updated from ${previousRoles.map((role: string) => `*${role}*`).join(',')} to ${currentRoles
            .map((role: string) => `*${role}*`)
            .join(',')} in the <${teamUrl}|${team.display_name}> channel`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.TEAMS_REMOVE_MEMBER)
    async handleTeamsRemoveMember(kysoTeamsRemoveMemberEvent: KysoTeamsRemoveMemberEvent) {
        const { organization, team, user, frontendUrl } = kysoTeamsRemoveMemberEvent
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `User *${user.name}* removed from the channel <${teamUrl}|${team.display_name}>`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.TEAMS_CREATE)
    async handleTeamsCreate(kysoTeamsCreateEvent: KysoTeamsCreateEvent) {
        const { user, organization, team, frontendUrl } = kysoTeamsCreateEvent as any
        const teamUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}`
        const text = `User *${user.name}* created the channel <${teamUrl}|${team.display_name}>`
        sendMessageToTeamsChannel(organization, null, text)
    }

    @EventPattern(KysoEventEnum.TEAMS_DELETE)
    async handleTeamsDelete(kysoTeamsDeleteEvent: KysoTeamsDeleteEvent) {
        const { user, organization, team, notifyUsers } = kysoTeamsDeleteEvent
        if (!notifyUsers) {
            return
        }
        const text = `User *${user.name}* deleted the channel *${team.display_name}*`
        sendMessageToTeamsChannel(organization, null, text)
    }
}
