import tsUnit = require('tsunit.external/tsUnit');
import * as Core from '../../src/';

    export class BasicTests extends tsUnit.TestClass {
        privmsgTestSimple() {
             var m = new Core.Message(":nick!ident@host PRIVMSG #channel :Hello world");

             this.areIdentical("PRIVMSG", m.command);
             this.areIdentical("nick", m.from.target);
             this.areIdentical("nick!ident@host", m.from.display);
             this.isTrue(m.from instanceof Core.User, "from should be from user");
             this.areIdentical("Hello", m.firstWord);
             this.areIdentical("Hello world", m.message);
        }

        noticeTestSimple() {
             var m = new Core.Message(":nick!ident@host NOTICE #channel :Hello world");

             this.areIdentical("NOTICE", m.command);
             this.areIdentical("nick", m.from.target);
             this.areIdentical("nick!ident@host", m.from.display);
             this.isTrue(m.from instanceof Core.User, "from should be from user");
             this.areIdentical("Hello", m.firstWord);
             this.areIdentical("Hello world", m.message);
        }

        privmsgFromServerTestSimple() {
             var m = new Core.Message(":irc.example.com PRIVMSG #channel :Hello world");

             this.areIdentical("PRIVMSG", m.command);
             this.areIdentical("irc.example.com", m.from.target);
             this.areIdentical("irc.example.com", m.from.display);
             this.isTrue(m.from instanceof Core.BaseServer, "from should be from server");
             this.areIdentical("Hello", m.firstWord);
             this.areIdentical("Hello world", m.message);
        }

        privmsgMessageTagsTestSimple() {
             var m = new Core.Message("@a=b;c;test.example.com/d=f :irc.example.com PRIVMSG #channel :Hello world");

             this.areIdentical("PRIVMSG", m.command);
             this.areIdentical("#channel", m.tokenized[2]);
             this.areIdentical("irc.example.com", m.from.target);
             this.areIdentical("irc.example.com", m.from.display);
             this.isTrue(m.from instanceof Core.BaseServer, "from should be from server");
             this.areIdentical("Hello", m.firstWord);
             this.areIdentical("Hello world", m.message);

             this.isTruthy(m.messageTags["a"], "the 'a' message tag should exist");
             this.areIdentical("b", m.messageTags["a"], "message tag 'a' has invalid value");
             
             this.areIdentical("", m.messageTags["c"], "message tag 'c' has invalid value");

             this.isTruthy(m.messageTags["test.example.com/d"], "the 'test.example.com/d' message tag should exist");
             this.areIdentical("f", m.messageTags["test.example.com/d"], "message tag 'test.example.com/d' has invalid value");
        }
    }