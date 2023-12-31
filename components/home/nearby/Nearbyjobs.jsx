import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS} from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from '../../../hook/useFetch'
import {Nearbyjobs} from "../../index";

const NearbyJobs = () => {
    const router = useRouter();

    const {data, isLoading, error} = useFetch
    ('search', {
        query: 'React developer',
        page: '1',
        num_pages: '1'
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Travail autour de vous</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary}/>
                ) : error ? (
                    <Text>Quelque chose c'est mal passer</Text>
                ) : (
                    data?.map((job) => (
                        <NearbyJobCard
                            job={job}
                            key={`nearby-job-${job.job_id}`}
                            handleNaviguate={() => router.push(`/job-details/${job.job_id}`)}
                        />
                    ))
                )}
            </View>
        </View>
    )
}

export default NearbyJobs