import { Organization, Team } from '@kyso-io/kyso-model'
import axios, { AxiosResponse } from 'axios'

export const sendMessageToTeamsChannel = async (organization: Organization, team: Team, text: string): Promise<AxiosResponse<any>> => {
    let url: string = null
    if (team?.teamsIncomingWebhookUrl) {
        url = team.teamsIncomingWebhookUrl
    } else if (organization?.options?.notifications?.teamsIncomingWebhookUrl) {
        url = organization.options.notifications.teamsIncomingWebhookUrl
    } else {
        return
    }
    const axiosResponse: AxiosResponse<any> = await axios.post(
        url,
        {
            text,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
    return axiosResponse
}
