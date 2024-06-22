import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const WORDPRESS_API_URL = 'https://www.sonymusic.com/wp-json/wp/v2';

export default function NoticiasWordPress() {
    const [logo, setLogo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
        try {
            const logoResponse = await axios.get(`${WORDPRESS_API_URL}/media`);
            const postsResponse = await axios.get(`${WORDPRESS_API_URL}/posts`);

            const logoUrl = logoResponse.data[0].source_url;
            const ultimosPosts = postsResponse.data.slice(0, 3);

            setLogo(logoUrl);
            setPosts(ultimosPosts);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error obteniendo datos: {error}</Text>
            </View>
        );
    }

    if (!logo || posts.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Cargando datos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: logo }} style={styles.logo} />
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.title}>{item.title.rendered}</Text>
                        <Text style={styles.excerpt}>{item.excerpt.rendered.replace(/<[^>]+>/g, '')}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                            <Text style={styles.link}>Visitar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    postContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    excerpt: {
        fontSize: 16,
        marginBottom: 10,
    },
    link: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});
