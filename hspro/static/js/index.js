isParams = {
    //�ݴ���ֽ�Կ����
    'chouGoods': {
        3851950: [8],//M4A1-ս������
        3851960: [8],//����-ս���ŷ�
        3852066: [8],//������-ս�����
        3852070: [8],//����ʿ-ս����
        3852071: [10],//M200-����-����Ƥ��
        3852075: [12],//M200-����
        3852076: [4],//M4A1-����
        3852079: [4],//Barrett-����
        3852081: [4],//AK47-������
        3852085: [4],//M4A1-����ʿ
        3875964: [2],//������ż�����ɽ��ף�
        3875965: [2],//�ŷ���ż�����ɽ��ף�
        3875967: [2],//������ż�����ɽ��ף�
        3875968: [2],//����ż�����ɽ��ף�
        3875969: [2],//������ż�����ɽ��ף�
    },
    /*
     �һ�����,�廢�ң��廢�Ͻ�����
     */
    'exchangeGoods': {
        '1': ['M4A1-ս������', 888],
        '2': ['����-ս���ŷ�', 888],
        '3': ['������-ս�����', 888],
        '4': ['����ʿ-ս����', 888],
        '5': ['M200-����-����Ƥ��', 1088],
        '6': ['M200-����', 1688],
        '7': ['M4A1-����', 488],
        '8': ['Barrett-����', 488],
        '9': ['AK47-������', 488],
        '10': ['M4A1-����ʿ', 488],
        '11': ['������ż�����ɽ��ף�', 188],
        '12': ['�ŷ���ż�����ɽ��ף�', 188],
        '13': ['������ż�����ɽ��ף�', 188],
        '14': ['����ż�����ɽ��ף�', 188],
        '15': ['������ż�����ɽ��ף�', 188],
        '16': ['���Ա��ȯx1', 5],
        '17': ['����ר��Կ��x1', 5],
    },
    'exchangeLpGoods': {
        '1': ['M4A1-ս������', 3],
        '2': ['����-ս���ŷ�', 3],
        '3': ['������-ս�����', 3],
        '4': ['����ʿ-ս����', 3],
        '5': ['M200-����-����Ƥ��', 3],
        '6': ['M200-����', 5],
        '7': ['M4A1-����', 1],
        '8': ['Barrett-����', 1],
        '9': ['AK47-������', 1],
        '10': ['M4A1-����ʿ', 1],
    },
    /*
    ��ż��ѡ5ѡ1
     */
    'exchangeSelectGoods': {
        '1': '������ż�����ɽ��ף�',
        '2': '�ŷ���ż�����ɽ��ף�',
        '3': '������ż�����ɽ��ף�',
        '4': '����ż�����ɽ��ף�',
        '5': '������ż�����ɽ��ף�',
    },
    /*
    ѡ������
     */
    'selectLp': {
        '1': {'name': '��������', 'img': 'ling1.png'},
        '2': {'name': '�ŷ�����', 'img': 'ling2.png'},
        '3': {'name': '��������', 'img': 'ling3.png'},
        '4': {'name': '������', 'img': 'ling4.png'},
        '5': {'name': '��������', 'img': 'ling5.png'},
    },
    /*
    �����Ӧ���ӵ���
     */
    'tzNum': {
        3852207: 10,
        3852208: 6,
        3852210: 4,
        3852212: 3,

        3874982: 10,
        3874983: 6,
        3874984: 4,
        3874985: 3,
    },
    djcActId: 28066,
    amsId: 533800,
    //������Ϣ
    bindinfo: '',
    //�齱����
    lockCj: false,
    lockCjTz: false,
    //��ǰ���Ƶ�����
    _select_num: -1,
    //����������Ϣ
    encrypt_info: {
        'encrypt': '',
        'item': '',
        'num': '',
        'user': '',
    },
    jfnum: [],
    shareLp: ['����', '�ŷ�', '����', '��', '����']
}

//======================= login =======================================================
milo.ready(function () {
    isH5 = location.hostname == "app.daoju.qq.com" ? true : false;
    isNei = milo.request('neiqian') != '' ? true : false;

    //����Ƿ��¼
    Milo.checkLogin({
        iUseQQConnect: false, //�����ǰ�ʹ�õĻ�����¼,�뽫�Ĳ�������true
        success: function (user) {
            console.log('�ѵ�¼��');
            console.log(user);
            $('#unlogin').hide();
            $('#logined').show();
            $("#userinfo").text(user.userInfo.userUin);
            //��ѯ��
            queryBindArea();
        },
        fail: function (res) {
            console.log('δ��¼��', res);
            toLogin()
        }
    });

    $("#dologin").on("click", function () {
        toLogin()
    });
    $("#dologout").on("click", function () {
        Milo.logout({
            callback: function () {
                location.reload();
            }
        });
    });

    // ֧���ϱ�
    // if (isH5) {
    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init('cf', isParams.djcActId, function (final_appid) {
            //��Ȩ
            $(".foot-tq").hide();
            if (final_appid == 1101) {
                $(".foot-tq").show();
            }
            //final_appidΪ�Զ��жϵõ��ĵ��۳�������
            //���δ������Զ����е��۳�ȫ�������ݵ��ռ������뱣�����ŵ�milo.ready�ڣ�����������ҳ���Ͻ��л��ڵ��۳ǻ�ŵ�eas�ع��ϱ�
        });
    });
    // }

    //�ֲ�
    queryBroadcast()
    //��ʼ���ڵ����
    initDom()
});

//��¼
function toLogin() {
    if (Milo.isMobile()) {
        Milo.mobileLoginByQQ();
    } else {
        Milo.loginByQQ();
    }
}

// ��ѯ�󶨴���
function queryBindArea() {
    var flow_query = {
        actId: isParams.amsId,
        token: '06e7aa',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            query: true
        },
        success: function (res) {
            if (res.data) {
                isParams.bindinfo = {
                    sArea: res.data.area,
                    sPartition: res.data.partition,
                    sPlatId: res.data.platId,
                    sRole: res.data.roleId,
                    sAreaName: res.data.areaName,
                    roleName: res.data.roleName
                };

                $("#userinfo").text(res.data.roleId);
                $('#spanNotBind').hide();
                $('#spanBind').show();
                $('#area_info').text(res.data.areaName);
                $('#role_info').text(res.data.roleName);

                enter(1);
                // get_support_list(1)
                if (milo.request("encrypt") != "") {
                    amsShare();
                }
            } else {
                commitBindArea()
            }
        },
        fail: function (res) {
            commitBindArea()
        },
    };
    Milo.emit(flow_query);
}

// �ύ�󶨴���
function commitBindArea() {
    var flow_commit = {
        actId: isParams.amsId,
        token: 'd6fc92',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            query: false
        },
        success: function (res) {
            //�Ѱ�ʱ����չ����
            location.reload();
        },
        fail: function (res) {
            commitBindArea();
        }
    };
    Milo.emit(flow_commit);
}

//�ֲ�
function queryBroadcast() {
    var flow = {
        actId: isParams.amsId,
        token: '77f5af',
        // loading: true, // ����loading����,Ĭ�ϲ�����
        time: 50, // �ֲ�ʱ��
        sData: {
            // query: false
        },
        success: function (res) {
            console.log('��ѯ�ֲ�success', res);
        },
        fail: function (res) {
            console.log('��ѯ�ֲ�fail', res);
        }
    }
    Milo.emit(flow);
}

//======================= �� end ==========================================================

//======================= ��ѯ start ==========================================================
// ��ѯ�廢��
function get_support_list(a,isButton = 0) {
    setTimeout(function () {
        var flow = {
            actId: isParams.amsId,
            token: '8edb67',
            loading: false, // ����loading����,Ĭ�ϲ�����
            sData: {},
            success: function (res) {
                console.log(res);
                res = res.details.jData
                var _html = ''
                if (res.data.length > 0) {
                    $.each(res.data, function (k, v) {
                        v.sRoleName = decodeURIComponent(v.sRoleName)
                        var lp = isParams.shareLp[v.iShareNum - 1]
                        _html += '<tr>\n' +
                            '<td>' + v.sUin + '</td>\n' +
                            '<td>' + v.sRoleName + '</td>' +
                            '<td>' + lp + '</td>' +
                            '<td>\n'
                        if (v.iType == 1) {
                            _html += '<a class="btnrequest sp db" href="javascript:amsSupport(' + v.id + ',' + v.iType + ',' + v.iShareNum + ',\'' + v.sRoleName + '\',\'' + v.encrypt + '\');"\n' +
                                'onclick="PTTSendClick(\'btn\',\'btnrequest1\',\'��Ҫ��ȡ\');">��Ҫ��Ҫ</a>\n'
                        } else {
                            _html += '<a class="btngive sp db" href="javascript:amsSupport(' + v.id + ',' + v.iType + ',' + v.iShareNum + ',\'' + v.sRoleName + '\',\'' + v.encrypt + '\');"\n' +
                                'onclick="PTTSendClick(\'btn\',\'btnrequest1\',\'��Ҫ��ȡ\');">��Ҫ����</a>\n'
                        }
                        _html += '</td></tr>\n' +
                            '<tr>'
                    })
                }
                $('.support_list').html(_html)
                if(isButton == 1){
                    alert('ˢ�³ɹ�~')
                }
            },
            fail: function (res) {
                failShow(res, function () {
                    alert(res.sMsg)
                })
            }
        }

        Milo.emit(flow);
    }, a || 2000);
}

// ��ѯ�廢��
function enter(a) {
    setTimeout(function () {
        var flow = {
            actId: isParams.amsId,
            token: 'e4f583',
            loading: false, // ����loading����,Ĭ�ϲ�����
            sData: {},
            success: function (res) {
                console.log(res);
                //�廢��ֵ����
                var data = res.details.jData;
                //1.����ֵ����
                var vals = {};
                vals["_2327"] = data.sOutValue1; //���
                $.each(data.sOutValue2.split("|"), function (k, v) {
                    if (k > 0) {
                        v = v.split(" ");
                        vals["_" + v[2]] = parseInt(v[4]); //���
                    }
                });
                isParams.jfnum = vals;
                //2.�廢��ֵ����ֱ����ʾ
                var tmp = [2327, 5445, 5447, 5448, 5449, 5450, 5451, 5452, 5454, 5456, 5457, 5458, 5472, 5473, 5474, 5475, 5476];
                $.each(tmp, function (k, v) {
                    $(".jf_" + v + "").html(parseInt(vals["_" + v + ""]));
                });

                //3.��ǰ�Ƿ���δ��ȡ��
                $hold_num = data.sOutValue3.split(',');
                $('.btndhcard').removeClass('gray')
                $.each($hold_num, function (k, v) {
                    if (v > 0) {
                        $('.exchangelp' + parseInt(k + 1)).addClass('gray')
                    }
                })

                isParams.lockCj = false
                isParams.lockCjTz = false

                //4.�廢����
                if (vals['_5448'] > 0) {
                    amsChouBox()
                }
                //5.�廢��ѡ
                if (vals['_5447'] > 0) {
                    TGDialogS('popSelect')
                }

                return;
            },
            fail: function (res) {
                failShow(res, function () {
                    alert(res.sMsg);
                })
            }
        }
        //ˢ���廢�Ҳ���
        Milo.emit(flow);
    }, a || 2000);
}

//======================= ��ѯ end ==========================================================
//======================= ���� start ==========================================================
// ��ͨ����
function amsBuy(item) {
    var flow = {
        actId: isParams.amsId,
        token: '8ab200',
        loading: true,
        sData: {
            item: item,
            gameId: "cf", // ҵ����
            djcActId: isParams.djcActId, // ���۳ǻid
            paytype: 2, // 1����ȯ 2������� 3����� 4����ȯ+��� 5�����2
        },
        // ֧������رջص�
        onPayClose: function () {
        },
        success: function (res) {
            console.log(res);
            enter(2000)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }
    Milo.emit(flow);
}

// �������ۿ۹���
function amsBuyDi() {
    var flow = {
        actId: isParams.amsId,
        token: 'eb1194',
        loading: true,
        sData: {
            gameId: "cf", // ҵ����
            djcActId: isParams.djcActId, // ���۳ǻid
            paytype: 2, // 1����ȯ 2������� 3����� 4����ȯ+��� 5�����2
        },
        // ֧������رջص�
        onPayClose: function () {
            enter(2000);
        },
        success: function (res) {
            console.log(res);
            enter(2000)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }
    Milo.emit(flow);
}

//======================= ���� end ==========================================================
//======================= �齱 start ==========================================================
//��ͨ�齱
function amsChou(item) {
    var flow = {
        actId: isParams.amsId,
        token: '3bfbbb',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData

            if (item == 1) {
                $('#jlname').html('');
                $('#jlname').html(callbackObj.sPackageName)
                TGDialogS('popdc');
            } else {
                var obj = tenResult(callbackObj.iPackageIdCnt, callbackObj.sPackageName);
                $('#choulist').html('');
                $.each(obj, function (k, v) {
                    $('#choulist').append('<p>' + v.name + '</p>');
                })
                TGDialogS('popJl');
            }
            isParams.lockCj = false
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg, function () {
                    isParams.lockCj = false
                });
            })
        }
    }

    if (typeof (isParams.bindinfo.sAreaName) != 'undefined' && isParams.bindinfo.sAreaName != '') {
        if (!isParams.lockCj) {
            isParams.lockCj = true
            Milo.emit(flow);
        }
    } else {
        commitBindArea()
    }
}

// ���ݴ��䡿��ȡ
function amsZanQu(item, name) {
    var flow = {
        actId: isParams.amsId,
        token: 'b7009f',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            alert(callbackObj.sMsg);
            amsHistoryList(2, isParams.pageNow)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    var msg = "ȷ����ȡ " + name + " ����" + isParams.bindinfo.sAreaName + "���𣿡�Ψһ�Ե�����ͬһ�����ڣ���Ϸ�ֿ��޷��ظ����ˣ������ѡ��";
    confirm(msg, function () {
        Milo.emit(flow);
    });
}

// ���ݴ��䡿�ֽ�Կ��
function amsZanFen(item, name, key) {
    var flow = {
        actId: isParams.amsId,
        token: 'a261b4',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            var msg = callbackObj.sMsg
            alert(msg, function () {
                amsHistoryList(2, isParams.pageNow)
                enter(2000);
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    confirm("ȷ���ֽ� " + name + " ��� " + key + " Կ����", function () {
        Milo.emit(flow);
    });
}

//�����廢�Ҷһ�����
function amsExchange(item) {
    var flow = {
        actId: isParams.amsId,
        token: '8e4fde',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.jData
            alert(callbackObj.sMsg, function () {
                enter(2000);
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    //'1': ['����-���Ƥ�������ã�', 1800],
    var msg = "ȷ��ʹ�� " + isParams.exchangeGoods[item][1] + " ���廢�Ҷһ� " + isParams.exchangeGoods[item][0] + " �𣿵�ǰ������" + isParams.bindinfo.sAreaName + "����Ψһ�Ե��߻��ɫ��ͬһ�����ڣ���Ϸ�ֿ��޷��ظ����ˣ������ѡ��";
    confirm(msg, function () {
        Milo.emit(flow);
    });
}

//�����廢�����ƶһ�����
function amsExchangeLp(item) {
    var flow = {
        actId: isParams.amsId,
        token: 'efe83f',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.jData
            alert(callbackObj.sMsg, function () {
                enter(2000);
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    //'1': ['����-���Ƥ�������ã�', 1800],
    var msg = "ȷ��ʹ�� " + isParams.exchangeLpGoods[item][1] + " ���廢�����ƶһ� " + isParams.exchangeGoods[item][0] + " �𣿵�ǰ������" + isParams.bindinfo.sAreaName + "����Ψһ�Ե��߻��ɫ��ͬһ�����ڣ���Ϸ�ֿ��޷��ظ����ˣ������ѡ��";
    confirm(msg, function () {
        Milo.emit(flow);
    });
}

//��ѡ���߶һ�
function amsSelectExchange() {
    var item = $("#popSelect a.on").attr('item');
    if (item) {
        var flow = {
            actId: isParams.amsId,
            token: '411bc7',
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                item: item
            },
            success: function (res) {
                console.log(res);
                callbackObj = res.details.jData
                alert(callbackObj.sMsg, function () {
                    closeDialog()
                    enter(2000);
                });
            },
            fail: function (res) {
                failShow(res, function () {
                    closeDialog()
                    alert(res.sMsg)
                })
            }
        }
        confirm("ȷ��ѡ�� " + isParams.exchangeSelectGoods[item] + " ��", function () {
            Milo.emit(flow);
        });
    } else {
        alert('��ѡ��Ҫ��ȡ�ĵ���~')
    }
}

//��������
function amsChouTz(item) {
    var flow = {
        actId: isParams.amsId,
        token: 'c8e06c',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            var tz = isParams.tzNum[callbackObj.iPackageId]
            if (isH5) {
                $('.tz_img').attr('src', '//game.gtimg.cn/images/appdaoju/act/a20230207fivetigers/popsz' + tz + '.png')
            } else {
                $('.tz_img').attr('src', '//game.gtimg.cn/images/actdaoju/act/a20230207fivetigers/popsz' + tz + '.png')
            }
            $('#popTz p').html(callbackObj.sMsg)

            TGDialogS('popTz');
            isParams.lockCjTz = false
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg, function () {
                    isParams.lockCjTz = false
                });
            })
        }
    }

    if (typeof (isParams.bindinfo.sAreaName) != 'undefined' && isParams.bindinfo.sAreaName != '') {
        if (!isParams.lockCjTz) {
            isParams.lockCjTz = true
            Milo.emit(flow);
        }
    } else {
        commitBindArea()
    }
}

//�廢�Ͻ������Զ��齱
function amsChouBox() {
    var flow = {
        actId: isParams.amsId,
        token: '119161',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {},
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            alert(callbackObj.sMsg, function () {
                enter(2000)
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }

    Milo.emit(flow);
}

//5������
function amsExchangeFive() {
    var flow = {
        actId: isParams.amsId,
        token: '61c65c',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {},
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            alert(callbackObj.sMsg, function () {
                enter(2000)
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }

    var msg = "ȷ�����ġ����ƣ��ŷɣ����������������Ƹ�1���һ����廢�Ͻ�����x1����";
    confirm(msg, function () {
        Milo.emit(flow);
    });
}

// ��Ȩ
function amsTeQ() {
    if (isH5) {
        var flow = {
            actId: isParams.amsId,
            token: '5bbf7d',
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {},
            success: function (res) {
                console.log(res);
                callbackObj = res.details.jData
                alert(callbackObj.sMsg, function () {
                    enter(2000);
                });
            },
            fail: function (res) {
                failShow(res, function () {
                    alert(res.sMsg)
                })
            }
        }

        Milo.emit(flow);
    }
}

//����
function amsLqFl() {
    var flow = {
        actId: isParams.amsId,
        token: 'dca1ba',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {},
        success: function (res) {
            console.log(res);
            callbackObj = res.details.jData
            alert(callbackObj.sMsg);
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    Milo.emit(flow);
}

//��ѯ����
function amsSelectFl() {
    $('.fldj').removeClass('on')
    var flow = {
        actId: isParams.amsId,
        token: '6b8317',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {},
        success: function (res) {
            console.log(res);
            alert('��ѯ�ɹ�~')
            callbackObj = res.details.jData
            if (callbackObj.num > 0) {
                $.each(callbackObj.items, function (k, v) {
                    $('.fl_' + v).addClass('on')
                })
            }
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    Milo.emit(flow);
}

//================================�齱 end ===========================================

//======================= ��¼ start ========================================================
// ���˻񽱼�¼
function amsHistoryList(item, pageNow) {
    isParams.pageNow = pageNow;
    var flow = {
        actId: isParams.amsId,
        token: 'b791e3',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {},
        success: function (res) {
            //��Ⱦ����
            $("#milo-lotteryRecordContainer" + item).html('');
            let tpl_html = $("#milo-lotteryRecordTpl" + item).html();
            // ��Ⱦ����
            const _html = Milo.tpl().compile(tpl_html, res.data);
            $("#milo-lotteryRecordContainer" + item).html(_html);

            //�����ѯ��һҳ��û������
            $('#milo-paginator' + item).show()
            if (res.total == 0) {
                $('#milo-paginator' + item).hide()
            } else {
                // ��ҳ��ʼ��
                Milo.pagination({
                    pages: res.total, // ��ҳ��
                    currentPage: flow.sData.pageNow, // ��ǰҳ
                    element: '#milo-paginator' + item, // ��ҳ����id��������Ⱦ��ҳ�ؼ�
                    // �л�ҳ��ʱ�����ص�
                    callback: function (page) {
                        if (page !== flow.sData.pageNow) {
                            amsHistoryList(item, page);
                        }
                    }
                });
            }

            //����ǲ�ѯ�����һҳ
            $("#milo-paginator" + item + " .my-page-next").show()
            if (res.total == flow.sData.pageNow) {
                $("#milo-paginator" + item + " .my-page-next").hide()
            }

            TGDialogS('showMyGiftContent' + item)
        },
        fail: function (res) {
            failShow(res)
        }
    }
    // ���ڴ����ҳ�ı仯
    if (pageNow) {
        flow.sData.pageNow = pageNow;
    } else {
        flow.sData.pageNow = 1;
    }
    //�ߴ�
    if (isH5) {
        if (item == 1) {
            flow.sData.pageSize = 5;
        } else {
            flow.sData.pageSize = 5;
        }
    } else {
        if (item == 1) {
            flow.sData.pageSize = 8;
        } else {
            flow.sData.pageSize = 8;
        }
    }
    flow.sData.item = item;

    Milo.emit(flow)
}

//================================���� start =============================================
//����
function amsSelectNum(num) {
    if (isH5) {
        var img = '//game.gtimg.cn/images/appdaoju/act/a20230207fivetigers/'
    } else {
        var img = '//game.gtimg.cn/images/actdaoju/act/a20230207fivetigers/'
    }
    isParams._select_num = num;
    $('.bglingyxz img').attr('src', img + isParams.selectLp[num]['img']);
    $('.bglingyxz p').html(isParams.selectLp[num]['name'])
}

function common_givef(callback = '') {
    if (isParams._select_num == -1) {
        alert('����ѡ����������');
        return false;
    }

    var id = ['5451', '5452', '5454', '5456', '5457'][isParams._select_num - 1];
    if (isParams.jfnum['_' + id] <= 0) {
        alert('��ǰ����ʣ��������');
        return false;
    }

    var id = ['5472','5473','5474','5475','5476'][isParams._select_num - 1];
    if (isParams.jfnum['_' + id] <= 0) {
        alert('��ǰ����ʣ������ʹ�������');
        return false;
    }
    $.isFunction(callback) && callback();
}


function giveF() {
    common_givef(function () {
        flow_928428.sData.item = 1;
        flow_928428.sData.num = isParams._select_num;
        $('.poptitsha').html('���ͺ�������')
        Milo.emit(flow_928428);
    })
}

function getF() {
    if (isParams._select_num == -1) {
        alert('����ѡ����Ҫ������');
        return false;
    }
    $('.poptitsha').html('��Ҫ��������')
    flow_928428.sData.item = 2;
    flow_928428.sData.num = isParams._select_num;
    Milo.emit(flow_928428);
}

var flow_928428 = {
    actId: isParams.amsId,
    token: '485e76',
    loading: true, // ����loading����,Ĭ�ϲ�����
    sData: {},
    success: function (res) {
        console.log(res);
        res = res.details.jData
        var str = 'encrypt=' + res.str + '&item=' + res.item + '&num=' + res.num
        // https://app.daoju.qq.com/act/a20230207fivetigers/index.html?encrypt={����.1858013.result}&item={����.1858010.value}&num={����.1858011.value}&uin={iUin}
        // shareUrl: location.href
        // shareUrl: location.href.split('?')[0]+'?'+res.sOutValue1+'&uin='+isParams.bindinfo.FroleName  //���ѷ�����qq�ţ������ǽ�ɫ��
        if (isParams.bindinfo.roleName) {
            _share.shareUrl = str + '&shareu=' + encodeURIComponent(isParams.bindinfo.roleName)
        } else {
            _share.shareUrl = str + '&shareu=' + res.user
        }

        qrCode(_share.shareUrl);
        if (!isH5) {
            TGDialogS('popshare');
        }
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}

//��Ȩ�Ƽ�
function supportGiveF() {
    common_givef(function () {
        flow_927577.sData.item = 1;
        flow_927577.sData.num = isParams._select_num;
        Milo.emit(flow_927577);
    })
}

function supportGetF() {
    if (isParams._select_num == -1) {
        alert('����ѡ����Ҫ������');
        return false;
    }
    flow_927577.sData.item = 2;
    flow_927577.sData.num = isParams._select_num;
    Milo.emit(flow_927577);
}

var flow_927577 = {
    actId: isParams.amsId,
    token: 'e22fc0',
    loading: true, // ����loading����,Ĭ�ϲ�����
    sData: {},
    success: function (res) {
        console.log(res);
        res = res.details.jData
        alert('���ɹ���Ȩ�Ƽ�����' + ['����', '��Ҫ'][res.item - 1] + ' ' + isParams.shareLp[res.num - 1] + '����1�š�', function () {
            get_support_list(1)
        })
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}


// https://connect.qq.com/widget/shareqq/index.html?url=https%3A%2F%2Fapp.daoju.qq.com%2Fact%2Fa20220810makewish%2Findex.html%3Fencrypt%3DbpNyaZWbZ21rk2PAasGUmmJqmZtrbGJuaJqXmppkkWZskw%253D%253D%26item%3D1%26num%3D8%26uin%3D619%E4%B8%8A%E6%B5%B71%26plat_support%3Dmqq&flash=&site=&style=201&width=32&height=32
// https://connect.qq.com/widget/shareqq/index.html?url=https%3A%2F%2Fapp.daoju.qq.com%2Fact%2Fa20220810makewish%2Findex.html%3Fencrypt%3DbpNyaZWbZ21rk2PAasGYnGuZmsc%253D%26item%3D1%26num%3D8%26uin%3D619%E4%B8%8A%E6%B5%B71%26plat_support%3Dmqq&desc=%E7%A9%BF%E8%B6%8A%E7%81%AB%E7%BA%BF%E4%BC%A0%E8%AF%B4%E5%85%89%E8%80%80%E5%BA%8F%E5%88%97%E5%8F%B7%E5%AE%9A%E5%88%B6%E5%A5%BD%E5%8F%8B%E4%BA%92%E8%B5%A0%EF%BC%81&title=%E7%A9%BF%E8%B6%8A%E7%81%AB%E7%BA%BF%E4%BC%A0%E8%AF%B4%E5%85%89%E8%80%80%E5%BA%8F%E5%88%97%E5%8F%B7%E5%AE%9A%E5%88%B6&summary=%E7%A9%BF%E8%B6%8A%E7%81%AB%E7%BA%BF%E4%BC%A0%E8%AF%B4%E5%85%89%E8%80%80%E5%BA%8F%E5%88%97%E5%8F%B7%E5%AE%9A%E5%88%B6%E5%A5%BD%E5%8F%8B%E4%BA%92%E8%B5%A0%EF%BC%81&pics=https%3A%2F%2Fgame.gtimg.cn%2Fimages%2Factdaoju%2Fact%2Fa20220810makewish%2Fshare.jpg&flash=&site=&style=201&width=32&height=32
//������
//��ͨ�齱

// ����ʧ�ܻص�
function failShow(res, callback = '') {
    console.log(res)
    if (res.iRet === 101 || res.iRet === '101') {
        // ��¼̬ʧЧ����Ҫ���µ���¼����
        toLogin()
    } else if (res.iRet === 99998 || res.iRet === '99998') {
// �����ύ�󶨴�������
        commitBindArea();
    } else {
        $.isFunction(callback) && callback(res);
    }
}

//================================����ǩ end =============================================
var _share = {
    title: "��Խ�����廢������",
    pic: "https://game.gtimg.cn/images/actdaoju/act/a20230207fivetigers/share.jpg",// ������Ҫ�޸�
    content: "��Խ�����廢�����룬���ѻ������ƣ��������룡",// ������Ҫ�޸�
    shareUrl: location.href,
    h5_url: ''
};
//================================���к� end =============================================
var $inp = $("#inp");

function qrCode(id) {
    // _share.h5_url = 'https://app.daoju.qq.com/act/a20230207fivetigers/index.html?' + id + '&plat_support=mqq';
    _share.h5_url = 'https://app.daoju.qq.com/act/a20230207fivetigers/index.html?' + id;
    _share.shareUrl = 'https://act.daoju.qq.com/act/a20230207fivetigers/index.html?' + id;
    console.log('_share.h5_url = ' + _share.h5_url)
    console.log(' _share.shareUrl = ' + _share.shareUrl)
    $("#qrcode").html("");
    if (isH5) {
        _share.shareUrl = _share.h5_url + "&ADTAG=" + milo.request("ADTAG");
        console.log(' qrCode  _share.shareUrl = ' + _share.shareUrl)
        setShare();
    } else {
        if (isNei) {
            need("util.jquery.qrcode", function ($a) {
                $("#qrcode").qrcode({
                    width: 180,
                    height: 180,
                    render: 'canvas',
                    text: _share.shareUrl
                });
            });
        } else {
            need("util.jquery.qrcode", function ($a) {
                $("#qrcode").qrcode({
                    width: 180,
                    height: 180,
                    render: 'canvas',
                    text: _share.h5_url
                });
            });
        }
    }
    $inp.val(_share.shareUrl);
    if (isH5) {
        sendShare()
    }
}

//���ƹ���
$('.copyUrl').click(function () {
    if ($inp.val() != "") {
        var inp = document.getElementById('inp');
        inp.select();
        if (document.execCommand("copy")) {
            alert('�Ѹ��ƺã�����ճ');
        } else {
            alert('���ֶ����Ƶ�������')
        }
    } else {
        alert("δ�������ӵ�ַ");
    }
});

//�����qq����
function send_friend() {
    if ($inp.val() == "") {
        alert("�������������У����Ժ�~");
        return false;
    }
    var p = {
        url: _share.h5_url, /*��ȡURL���ɼ������Է���QQ��ʶ������ͳ��*/
        // url: 'https://app.daoju.qq.com/act/a20230207fivetigers/index.html?encrypt=bpNyaZWbZ21rk2PAasGUmGZnm5pra2ZtaJqXmppkkWtskw%3&item=1&num=8&uin=&plat_support=mqq', /*��ȡURL���ɼ������Է���QQ��ʶ������ͳ��*/
        desc: _share.content, /*��������(���Ӧģ���û��Ի�),֧�ֶ���������չ�֣�ʹ��|�ָ���*/
        title: _share.title, /*�������(��ѡ)*/
        summary: _share.content,
        pics: _share.pic, /*����ͼƬ(��ѡ)*/
        flash: '',
        site: '',
        style: '201',
        width: 32,
        height: 32
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    window.open('//connect.qq.com/widget/shareqq/index.html?' + s.join('&'), '');
}

//����������QQ�ռ�
function send_qzone() {
    if ($inp.val() == "") {
        alert("�������������У����Ժ�~");
        return false;
    }
    need("biz.qzoneShare", function (share) {
        //if (isNei) {
        //    //setInterval(function () {
        //    //    $(".lz_act_pop").parent().css("zoom", "1");
        //    //}, 10);
        //}

        share.share({
            url: $inp.val(),//��������[��ѡ��������ȡҳ��url]
            title: _share.title,
            desc: _share.content,//
            pics: _share.pic,
            summary: _share.content,
            showcount: '0',//1Ĭ����ʾ  0����ʾ
            md: '1',//1Ĭ�ϲ��������  0�������
            callback: function (shareId) {
                alert("����ɹ���");
            }
        });
    });
}

//�������
if ((new RegExp('cfapp').test(navigator.userAgent)) || /GameHelper/.test(navigator.userAgent) || /cfapp/.test(navigator.userAgent)) {
    $('#shequ').attr("href", "javascript:GameHelper.shareWebPageWithFuntion(_share.title, _share.content, _share.pic, _share.shareUrl, '8', 1)");
}

function sendShare() {
    if ((new RegExp('cfapp').test(navigator.userAgent)) || /GameHelper/.test(navigator.userAgent) || /cfapp/.test(navigator.userAgent)) {
        launchShareWindow();
    } else {
        need("daoju.ui.share", function (share) {
            share.sendShare({
                title: _share.title,
                icon: _share.pic,
                desc: _share.content,
                link: _share.shareUrl
            });
        });
    }
}

//�ƻ�
function launchShareWindow() {
    var title = _share.title,
        desc = _share.content,
        icon = _share.pic,
        url = _share.shareUrl;
    if (typeof (GameHelper) != 'undefined') {
        //�ƻ�����qq,weix����
        // url = 'https://app.daoju.qq.com/act/a20230207fivetigers/index.html?scode=1&encrypt=' + encodeURIComponent(window.isParam.LoginShareCode) + "&ADTAG=" + milo.request("ADTAG") + "&plat_support=mqq";
        url = _share.h5_url + "&scode=1&ADTAG=" + milo.request("ADTAG");
        GameHelper.shareWebPageWithFuntion(title, desc, icon, url, '1,2,3,4,5,6,8', 1)
    } else {
        zhtc();
    }
}

function zhtc() {
    var share_url = _share.shareUrl;
    var title = _share.title;
    var summary = _share.content;
    var icon = _share.pic;
    var collect_state = 1;

    //����cf����ios��Ҫ�ĺ���
    var sendIosMessage = function (src) {
        var oIFrame = document.getElementById("__MessageIframe__");
        if (!oIFrame) {
            oIFrame = document.createElement("iframe");
            oIFrame.id = "__MessageIframe__";
            oIFrame.frameborder = "0";
            oIFrame.scrolling = "no";
            oIFrame.width = "0px";
            oIFrame.height = "0px";
            oIFrame.frameBorder = "0";
            oIFrame.style.display = "none";
            oIFrame.src = src;
            document.body.appendChild(oIFrame);
        } else {
            oIFrame.src = src;
        }
    };
    //����cf����׿��Ҫ�ĺ���
    var sendAndroidMessage = function (src) {
        window.location.href = src;
    };
    var data = {
        "title": encodeURIComponent(title),
        "summary": encodeURIComponent(summary),
        "icon": encodeURIComponent(icon),
        "is_act": encodeURIComponent("1"),
        "url": encodeURIComponent(share_url),
        "collect_state": encodeURIComponent(collect_state)
    };
    var src = "requestapp://sharenew?param=" + encodeURIComponent(JSON.stringify(data));
    if (new RegExp('cfapp').test(navigator.userAgent)) {
        if (new RegExp('Android').test(navigator.userAgent)) {
            sendAndroidMessage(src);
        } else {
            sendIosMessage(src);
        }
    }
}

// ��ʼ������
function setShare() {
    setTimeout(function () {
        need("daoju.ui.share", function (share) {
            if (typeof ek != "undefined") {
                //����Ѷ����
                ek.share.setShare({
                    title: _share.title,
                    img_url: _share.pic,
                    desc: _share.content,
                    link: _share.shareUrl,
                    callback: function () {
                        alert("����ɹ���");
                    }
                });
            } else {
                //������Ѷ����
                share.setShare({
                    title: _share.title,
                    icon: _share.pic,
                    desc: _share.content,
                    link: _share.shareUrl
                });
            }
        });
    }, 500);
}

function amsShare() {
    var encrypt = milo.request('encrypt');
    if (milo.request('scode') != '' && milo.request('scode') == 1) {
        encrypt = decodeURIComponent(decodeURIComponent(encrypt));
    }
    if (encrypt.indexOf("+") != -1) {
        encrypt = encodeURIComponent(encrypt);
    }

    isParams.encrypt_info['encrypt'] = encrypt
    isParams.encrypt_info['item'] = milo.request('item')
    isParams.encrypt_info['num'] = milo.request('num')
    isParams.encrypt_info['user'] = decodeURIComponent(milo.request('shareu'))

    if (isParams.encrypt_info['encrypt'] && isParams.encrypt_info['item'] && isParams.encrypt_info['num']) {
        $('.share_item').html('��' + isParams.encrypt_info['user'] + '��' + ['����', '��Ҫ'][isParams.encrypt_info['item'] - 1])
        $('.share_num').html(isParams.shareLp[isParams.encrypt_info['num'] - 1])
        if (isH5) {
            $('.share_num_img').attr('src', '//game.gtimg.cn/images/appdaoju/act/a20230207fivetigers/ling' + isParams.encrypt_info['num'] + '.png')
        } else {
            $('.share_num_img').attr('src', '//game.gtimg.cn/images/actdaoju/act/a20230207fivetigers/ling' + isParams.encrypt_info['num'] + '.png')
        }

        TGDialogS('popYq')
    }
}

//url��������ͬ�����
function agreeShare() {
    var flow = {
        actId: isParams.amsId,
        token: 'a9d14f',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            encrypt: isParams.encrypt_info['encrypt'],
            item: isParams.encrypt_info['item'],
            num: isParams.encrypt_info['num'],
        },
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            var msg = callbackObj.sMsg;
            if (isParams.encrypt_info['item'] == 2) {
                msg = '���ͳɹ�'
            }
            alert(msg, function () {
                enter(1500)
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    Milo.emit(flow);
}

//����Ȩ��ͬ��ʹ��
function amsSupport(id, item, num, sRoleName, encrypt) {
    var flow = {
        actId: isParams.amsId,
        token: 'ebfdf0',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            id: id,
            item: item,
            num: num,
            encrypt: encrypt,
        },
        success: function (res) {
            console.log(res);
            var callbackObj = res.details.jData
            var msg = callbackObj.sMsg;
            if (item == 2) {
                msg = '���ͳɹ�'
            }
            alert(msg, function () {
                enter(1500)
                get_support_list(1)
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    confirm('�û���' + sRoleName + ' ' + ['����', '��Ҫ'][item - 1] + '����1����' + isParams.shareLp[num - 1] + '�����ƣ���ȷ�Ͻ�����', function () {
        Milo.emit(flow);
    })
}

function initDom() {
    if (isZhApp()) {
        $('#dologout').css('display', 'none');
    }

    //���������л�
    $('.popbtnnav a').each(function (i) {
        $(this).click(function () {
            $(this).addClass('on').siblings().removeClass('on');
            $('.tablegl').eq(i).show().siblings().hide();
        })
    })

    //��������ѡ��
    $('.popbtnrw').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    })
}
