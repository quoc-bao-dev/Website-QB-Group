import { io } from 'socket.io-client';
import chatService from '../../api/chatService';
import { Message, Participant, RoomChat } from '../../interface/chat';
import signal from '../../lib/listener';
import QBComponent from '../../lib/QBComponent';
import chatReducer from '../../store/chatReducer';
import userReducer from '../../store/userReducer';
import { BASE_URL_SOCKET } from '../../config/config';
import { toImage } from '../../util/image';

interface MessageItemProps {
    message: Message;
    userId: string;
}
class MessageItem extends QBComponent<MessageItemProps> {
    protected markup: () => string = () => {
        if (this.props.userId == this.props.message.senderId._id) {
            return /*html*/ `
            <!-- send -->
            <div class="mb-4 flex items-start justify-end gap-2">
                <div class="bg-gray-100 text-gray-800 p-2 rounded-lg max-w-xs">
                    <p>${this.props.message.message}</p>
                </div>
                ${
                    this.props.message.senderId.avatar
                        ? /*html*/ `
                    <img class="w-10 h-10 rounded-full object-cover" src="${toImage(
                        this.props.message.senderId.avatar
                    )}" alt="">
                    `
                        : /*html*/ `
                    <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                    <span>${this.props.message.senderId.fullName[0]}</span>
                </div>
                    `
                }
            </div>
            <!-- send -->
            `;
        }

        return /*html*/ `
         <!-- give -->
            <div class="mb-4 flex items-start gap-2">
                ${
                    this.props.message.senderId.avatar
                        ? /*html*/ `
                    <img class="w-10 h-10 rounded-full object-cover" src="${toImage(
                        this.props.message.senderId.avatar
                    )}" alt="">
                    `
                        : /*html*/ `
                    <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                    <span>${this.props.message.senderId.fullName[0]}</span>
                </div>
                    `
                }
                <div class="bg-blue-100 text-blue-800 p-2 rounded-lg max-w-xs">
                    <p>${this.props.message.message}</p>
                </div>
            </div>
            <!-- give -->
        `;
    };
}

export interface ChatBoxProps {
    roomId: string;
}

interface ChatBoxState {
    isShow: boolean;
    lsMessage: Message[];
    roomInfo: RoomChat | null;
}
class ChatBox extends QBComponent<ChatBoxProps, ChatBoxState> {
    constructor(props: ChatBoxProps) {
        super(props);

        this.state = {
            isShow: false,
            lsMessage: [],
            roomInfo: null,
        };

        signal.on(
            `show-chat-${this.props.roomId}`,
            () => {
                this.setState({ isShow: true });
            },
            `show-chat-${this.props.roomId}`
        );
    }
    protected markup: () => string = () => {
        if (!this.state.isShow || !this.props.roomId) {
            return '';
        }

        const roomInfo = this.state.roomInfo?.participants.find(
            (item) => (item as Participant)._id !== userReducer.getData?.userId
        ) as Participant;

        return /*html*/ `
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 border-b border-gray-300">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img src="${toImage(
                        roomInfo?.avatar
                    )}" class="w-10 h-10 rounded-full" alt="">
                    <div class="text-base font-semibold">
                        <h2 class="text-gray-800">${roomInfo?.fullName}</h2>
                        <div class="flex gap-1 items-center">
                            <div class="w-3 h-3 aspect-[1/1] rounded-full bg-green-500 border border-white"></div>
                            <p class="text-gray-400 text-sm font-medium">
                                Online</p>
                        </div>

                    </div>
                </div>
                <div class="text-gray-400 text-lg">
                    <span class="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 btn-close">
                        <i class="fa-solid fa-xmark "></i>
                    </span>
                </div>
            </div>
        </div>
        <div class="p-4 h-80 w-[350px] overflow-y-auto bg-gray-50 chat-wrrapper">
            <!-- Messages -->

            <div id="list-message"></div>


            <!-- Add more messages here -->
        </div>
        <div class="border-t border-gray-300 p-4 flex items-center">
            <input type="text" placeholder="Type a message..."
                class="flex-1 border border-gray-300 rounded-lg p-2 mr-2" id="chat-input">
            <button class="bg-blue-500 text-white px-3 py-1 rounded-lg btn-send"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
    </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        if (this.state.isShow) {
            this.renderListMessage();
        }

        setTimeout(() => {
            const wrapper = document.querySelector(
                '.chat-wrrapper'
            ) as HTMLDivElement;

            const chatBox = document.querySelector(
                '#list-message'
            ) as HTMLDivElement;

            if (chatBox && wrapper) {
                const scrollToPosition =
                    chatBox.offsetTop + chatBox.scrollHeight * 200;
                wrapper.scrollTo({
                    top: scrollToPosition,
                });
            }
        }, 10);
    }

    private renderListMessage() {
        const ls = this.state.lsMessage.map((item) => {
            return {
                userId: userReducer.getData?.userId,
                message: item,
            };
        }) as MessageItemProps[];
        this.renderList('#list-message', ls, MessageItem);
    }

    protected addEventListener(): void {
        this.signEvent('.btn-close', 'click', this.closeChatBox);
        this.signEvent('.btn-send', 'click', this.sendMessage);
    }

    private closeChatBox = () => {
        this.setState({
            isShow: false,
        });

        signal.emit(`show-icon-${this.props.roomId}`);
    };

    private sendMessage = () => {
        const input = this.node('#chat-input') as HTMLInputElement;
        const text = input.value;
        if (text === '') {
            return;
        }

        input.value = '';

        // send message

        const message = {
            chatId: this.props.roomId,
            senderId: userReducer.getData?.userId,
            message: text,
        };

        chatReducer.socket!.emit('sendMessage', message);
    };

    protected async afterRender(): Promise<void> {
        const ls = await chatService.getChatByRoomId(this.props.roomId);
        const roomInfo = await chatService.getRoomInfo(this.props.roomId);

        this.setState({ lsMessage: ls, roomInfo: roomInfo });

        const socket = io(BASE_URL_SOCKET);

        socket.emit('joinRoom', this.props.roomId);

        socket.on('newMessage', (data) => {
            this.updateMessage(data);
            signal.emit(`hide-icon-${this.props.roomId}`);
        });
    }

    private updateMessage(data: any) {
        this.setState({
            lsMessage: [...this.state.lsMessage, data],
            isShow: true,
        });
    }
}

export default ChatBox;
