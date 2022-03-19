

export default interface IMessageRepository {
    sendMessage(user: string): Promise<string>
    getMessage(id: string): Promise<string>
    
}