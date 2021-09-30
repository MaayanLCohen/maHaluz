import React, { Component } from 'react';
import ReturnBar from './ReturnBar';
import gear from "./images/gear.png";
import deleteImg from "./images/delete.svg";
import banWhite from "./images/banWhite.svg";


const localStorageSpace = function () {
    var allStrings = '';
    for (var key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + Math.round(((allStrings.length * 16) / (8 * 1024))) + ' KB' : '0 KB';
};

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSize: localStorageSpace()
        };
    }

    handleCleanAll = () => {
        for (var key in window.localStorage) {
            localStorage.removeItem(key);
        }
        this.setState({
            dataSize: localStorageSpace()
        });
    }

    handleCleanLuz = () => {
        for (var key in window.localStorage) {
            if (key !== 'archive')
                localStorage.removeItem(key);
        }
        this.setState({
            dataSize: localStorageSpace()
        });
    }


    render() {
        return (
            <div className="full">
                <ReturnBar goBack={this.props.history.goBack} />
                <div className="Day mainBox">

                    <div className="settingCoteret">
                        הצעות לפעילויות בלו"ז
                    </div>
                    <div className=" setting">
                        הפעילויות המוצעות מאפשרות הכנסה מהירה של פעילות ללו"ז. באפשרותך לנהל את הופעתן.
                        <div className="clearBotton" onClick={() => this.props.history.push('/archive')} style={{ backgroundColor: "#30b571" }}>
                            ניהול הפעילויות המוצעות
                            <img style={{ marginRight: "10px", marginBottom: '3px' }} src={gear} height="13px" alt="icon"/>
                        </div>
                    </div>

                    <div className="settingCoteret">
                        איחסון
                    </div>
                    <div className=" setting">
                        <div >
                            נפח השימוש באחסון:
                            <div style={{ direction: 'ltr', float: 'left', width: 'fit-content', display: 'inline-block' }} >
                                {this.state.dataSize}
                            </div>
                            <div className="clear">
                                <div className="clearBotton" onClick={this.handleCleanLuz} >
                                    נקה את הלוז"ים הקיימים
                                    <img onClick={this.handleClean} style={{ marginRight: "10px", marginBottom: '3px' }} src={deleteImg} height="11px" alt="icon"/>
                                </div>
                                <div className="clearBotton" onClick={this.handleCleanAll} style={{}}>
                                    נקה הכל
                                    <img style={{ marginRight: "10px", marginBottom: '3px' }} src={banWhite} height="13px" alt="icon"/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="settingCoteret">
                        אודות
                    </div>
                    <div className=" setting">
                        אף פעם לא הבנתי למה צריך לטרוח לכתוב אודות, גם ככה אף אחד לא קורא את זה. אם בכל זאת קראתם אז הנה בדיחה: איך קוראים למכשיר ניווט לוויני של רועה צאן? ג’י פי עז.
                        כותבת כאן עוד כמה שטויות כדי שיראה ארוך ומכובד. גברים הם כמו אופנועים אין בהם אמונה. חוץ מהדרי, הוא אחלה גבר. ואח שלי, הקטן לא הגדול. והבוס העתידי שלי שהוא בכלל מלך ולא ברור למה הוא מבזבז את זמנו לקרוא את זה. ואם את בוסית שקוראת את זה אז שתדעי שאם את עושה תאונה אז הגבר אשם כי הוא לא היה במטבח ואם את שואלת את עצמך איפה שמעתי את הטמטום הזה זה אחי הקטן סיפר לי ולכן הוא מצוין לעיל ולא הגדול.
                        <div
                            style={{ fontSize: '1.6vh', direction: 'ltr' }}
                            className="credit" >
                            Icons made by <a title='FontAwesome' href='http://fontawesome.io'>Font Awesome</a> by Dave Gandy.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;