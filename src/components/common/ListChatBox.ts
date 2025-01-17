import chatService from '../../api/chatService';
import userService from '../../api/userService';
import { Participant, RoomChat } from '../../interface/chat';
import { IUser } from '../../interface/user';
import signal from '../../lib/listener';
import QBComponent from '../../lib/QBComponent';
import chatReducer from '../../store/chatReducer';
import userReducer from '../../store/userReducer';
import { toImage } from '../../util/image';
import ChatBox, { ChatBoxProps } from './ChatBox';

interface ListChatBoxState {
    lsRoom: ChatBoxProps[];
    lsRoomOfUser: RoomChat[];
}

class ChatItem extends QBComponent<
    RoomChat,
    { isShow: boolean; user: IUser | null }
> {
    constructor(props: RoomChat) {
        super(props);
        this.state = {
            isShow: true,
            user: null,
        };

        signal.on(
            `show-icon-${this.props._id}`,
            () => {
                this.setState({ isShow: true });
            },
            `show-icon-${this.props._id}`
        );

        signal.on(
            `hide-icon-${this.props._id}`,
            () => {
                this.setState({ isShow: false });
            },
            `hide-icon-${this.props._id}`
        );
    }
    protected markup: () => string = () => {
        if (!this.state.isShow || !this.state.user) {
            return '';
        }

        if (!this.state.user.avatar) {
            return /*html*/ `
            <div class="size-[48px] rounded-full bg-blue-500 flex items-center justify-center text-white mr-2 avatar">
                <span>${this.state.user.fullName[0]}</span>
            </div>
            `;
        }
        return /*html*/ `
        <img class="size-[48px] rounded-full object-cover avatar" src="${toImage(
            this.state.user?.avatar
        )}" alt=""/>
        `;
    };
    protected addEventListener(): void {
        this.signEvent('.avatar', 'click', () => {
            this.setState({ isShow: false });
            signal.emit(`show-chat-${this.props._id}`);
        });
    }

    protected async afterRender(): Promise<void> {
        const idUser = this.props.participants.find(
            (item) => (item as string) !== userReducer.getData?.userId
        ) as string | undefined;

        if (idUser) {
            const user = await userService.getUserById(idUser as string);

            this.setState({ user });
        }
    }
}
class ListChatBox extends QBComponent<{}, ListChatBoxState> {
    constructor() {
        super();

        this.state = {
            lsRoom: [],
            lsRoomOfUser: [],
        };

        signal.on(
            'list-chat-change',
            this.setListChat.bind(this),
            'list-chat-change'
        );
    }
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="flex gap-2 z-50">
         <div class="list-chat-box flex gap-5" id="list-chat-box">
        </div>
        <div class="flex flex-col gap-2 justify-end pb-5 pr-2" id="list-icon"></div>
       </div>
        `;
    };

    protected renderUI(): void {
        super.renderUI();

        this.renderList('#list-chat-box', this.state.lsRoom, ChatBox);
        this.renderListIcon();
    }

    private renderListIcon() {
        const ls = this.state.lsRoomOfUser.map((item) => {
            const room = item.participants.find(
                (participant) =>
                    (participant as Participant)._id !==
                    userReducer.getData?.userId
            ) as Participant;
            return {
                ...room,
            };
        });
        ls;

        this.renderList('#list-icon', this.state.lsRoomOfUser, ChatItem);
    }

    protected async afterRender(): Promise<void> {
        const lsRoom = await chatService.getChatInfoByUserId(
            userReducer.getData?.userId as string
        );

        this.state.lsRoomOfUser = lsRoom;
        /// set list chat
        await this.setListChat();
    }

    private async setListChat() {
        const ls = chatReducer.getListChat.map((item) => {
            return { roomId: item._id };
        });
        this.setState({ lsRoom: ls });
    }
}

export default ListChatBox;
