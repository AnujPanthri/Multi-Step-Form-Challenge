import React, { createContext, useState, useEffect } from 'react'

export const DataContext = createContext();

export function DataProvider({ children }) {
    const plans = {
        arcade: {
            monthly: {
                rate: "$9",
            },
            yearly: {
                rate: "$90",
                msg: "2 months free",
            }
        },
        advanced: {
            monthly: {
                rate: "$12",
            },
            yearly: {
                rate: "$120",
                msg: "2 months free",
            }
        },
        pro: {
            monthly: {
                rate: "$15",
            },
            yearly: {
                rate: "$150",
                msg: "2 months free",
            }
        }
    };
    const addons = {
        online_service: {
            monthly: {
                rate: "$1"
            },
            yearly: {
                rate: "$10"
            },
        },
        larger_storage: {
            monthly: {
                rate: "$2"
            },
            yearly: {
                rate: "$20"
            },
        },
        customizable_profile: {
            monthly: {
                rate: "$2"
            },
            yearly: {
                rate: "$20"
            },
        }
    }

    const [allFormData, setAllFormData] = useState({
        plan: "arcade",
        isyearly: false,
        addons: {
            online_service: true,
            larger_storage: true,
        }
    });

    useEffect(() => {
        console.log("allFormData:", allFormData);
    }, [allFormData])
    return (
        <DataContext.Provider value={{
            plans, addons, allFormData, setAllFormData,
        }}>
            {children}
        </DataContext.Provider>
    )
}