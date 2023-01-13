import { Organization, Team } from '@kyso-io/kyso-model'
import { AxiosResponse } from 'axios'

export const sendMessageToTeamsChannel = async (organization: Organization, team: Team, text: string): Promise<AxiosResponse<any>> => {
    return null
}
