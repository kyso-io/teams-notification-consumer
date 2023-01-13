import { KysoDiscussionsAssigneeEvent, KysoDiscussionsCreateEvent, KysoDiscussionsDeleteEvent, KysoDiscussionsUpdateEvent, KysoEventEnum } from '@kyso-io/kyso-model'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { sendMessageToTeamsChannel } from '../helpers'

@Controller()
export class DiscussionsController {
    @EventPattern(KysoEventEnum.DISCUSSIONS_CREATE)
    async handleDiscussionsCreated(kysoDiscussionsCreateEvent: KysoDiscussionsCreateEvent) {
        const { organization, team, discussion, frontendUrl, user } = kysoDiscussionsCreateEvent
        const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
        const text = `User *${user.name}* created a new discussion <${discussionUrl}|${discussion.title}>`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.DISCUSSIONS_UPDATE)
    async handleDiscussionsUpdated(kysoDiscussionsUpdateEvent: KysoDiscussionsUpdateEvent) {
        const { organization, team, discussion, frontendUrl, user } = kysoDiscussionsUpdateEvent
        const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
        const text = `User *${user.name}* updated discussion <${discussionUrl}|${discussion.title}>`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.DISCUSSIONS_DELETE)
    async handleDiscussionsDeleted(kysoDiscussionsDeleteEvent: KysoDiscussionsDeleteEvent) {
        const { organization, team, discussion, user } = kysoDiscussionsDeleteEvent
        const text = `User *${user.name}* deleted discussion *${discussion.title}*`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.DISCUSSIONS_NEW_ASSIGNEE)
    async handleDiscussionsNewAssignee(kysoDiscussionsAssigneeEvent: KysoDiscussionsAssigneeEvent) {
        const { organization, team, discussion, user, assigneeUser, frontendUrl } = kysoDiscussionsAssigneeEvent
        const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
        const text = `User *${user.name}* assigned *${assigneeUser.name}* to discussion <${discussionUrl}|${discussion.title}>`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.DISCUSSIONS_REMOVE_ASSIGNEE)
    async handleDiscussionsRemoveAssignee(kysoDiscussionsAssigneeEvent: KysoDiscussionsAssigneeEvent) {
        const { organization, team, discussion, user, assigneeUser, frontendUrl } = kysoDiscussionsAssigneeEvent
        const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
        const text = `User *${user.name}* removed *${assigneeUser.name}* from discussion <${discussionUrl}|${discussion.title}>`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.DISCUSSIONS_USER_ASSIGNED)
    async handleDiscussionsUserAssigned(kysoDiscussionsAssigneeEvent: KysoDiscussionsAssigneeEvent) {
        const { organization, team, discussion, user, assigneeUser, frontendUrl } = kysoDiscussionsAssigneeEvent
        const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
        const text = `User *${user.name}* assigned *${assigneeUser.name}* to discussion <${discussionUrl}|${discussion.title}>`
        sendMessageToTeamsChannel(organization, team, text)
    }

    @EventPattern(KysoEventEnum.DISCUSSIONS_USER_UNASSIGNED)
    async handleDiscussionsUserUnassigned(kysoDiscussionsAssigneeEvent: KysoDiscussionsAssigneeEvent) {
        const { organization, team, discussion, user, assigneeUser, frontendUrl } = kysoDiscussionsAssigneeEvent
        const discussionUrl = `${frontendUrl}/${organization.sluglified_name}/${team.sluglified_name}/discussions/${discussion.id}`
        const text = `User *${user.name}* removed *${assigneeUser.name}* from discussion <${discussionUrl}|${discussion.title}>`
        sendMessageToTeamsChannel(organization, team, text)
    }
}
